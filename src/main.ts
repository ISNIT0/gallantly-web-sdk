import { api } from './http';
import Notifier from './Notifier.svelte';

const config = "CONFIG_TO_REPLACE" as any as (Config | string);

export interface IdentifyOpts {
	name?: string;
	email?: string;
	extra?: Record<string, any>;
}

const defaultConfig: Partial<Config> = {
	color: 'pink',
	notifierEnabled: true,
	pollInterval: 5000,
}

class Gallant {
	private config: Config | undefined;
	private productId: string;
	private identifiedAs: string | undefined;
	private notifier: Notifier;
	private notifications: AchievementNotification[] = [];
	private achievements: Achievement[] = [];

	constructor(config?: Config) {
		this.config = Object.assign({}, defaultConfig, config);
		this.productId = this.config.productId;
		if (!this.productId) throw new Error(`Project Id not specified`);
	}

	identify(id: string, opts: IdentifyOpts = {}) {
		this.identifiedAs = id;
		api.url(`/end-user/identify`).post({
			productId: this.productId,
			identifiedAs: id,
			...opts
		});

		this.notifier = this.makeNotifier();
		this.getAchievements(true);
		this.startNotifierPoll(this.config.pollInterval);
	}

	async getNotifications(forceUpdate = false) {
		if (!this.identifiedAs) throw new Error(`Not yet identified`);
		if (forceUpdate) {
			const notifications = await api.url(`/notification/id/${this.identifiedAs}`).get().json() as AchievementNotification[];
			this.notifications = notifications;
		}
		return this.notifications;
	}

	async getAchievements(forceUpdate = false) {
		if (!this.identifiedAs) throw new Error(`Not yet identified`);
		if (forceUpdate) {
			const achievements = await api.url(`/achievement/id/${this.identifiedAs}`).get().json() as Achievement[];
			this.achievements = achievements;
		}
		return this.achievements;
	}

	makeNotifier() {
		const notifierCont = document.createElement('div');
		const notifier = new Notifier({
			target: notifierCont,
			props: {
				notifications: typeof this.config === 'string' ? [] : this.config.initNotifications || [],
				config: typeof this.config === 'string' ? {} : { ...this.config, initNotifications: undefined }
			},
		});
		document.body.appendChild(notifierCont);
		return notifier;
	}

	async startNotifierPoll(intervalMs: number) {
		try {
			this.notifications = await this.getNotifications(true);
			this.notifier.$set({ notifications: this.notifications })
		} catch (err) {
			console.error(`[GALLANT] Failed to fetch notifications`, err);
		}
		
		setTimeout(() => {
			this.startNotifierPoll(intervalMs);
		}, intervalMs);
	}
};

let gallant: Gallant | undefined;

if (typeof config === 'string') {
	(window as any).Gallant = Gallant;
} else {
	gallant = (window as any).gallant = new Gallant(config);
}

export { gallant, Gallant };
