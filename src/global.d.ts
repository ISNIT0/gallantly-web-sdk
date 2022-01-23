/// <reference types="svelte" />

interface AchievementNotification {
    title: string;
    iconUrl: string;
    achievedAt: Date;
}

interface Config {
    productId: string;
    initNotifications?: AchievementNotification[];
    color?: string;
    notifierEnabled?: boolean;
    pollInterval?: number;
}

interface Achievement {
    title: string;
    iconUrl: string;
    achievedAt: Date;
    config: any; // TODO
}
