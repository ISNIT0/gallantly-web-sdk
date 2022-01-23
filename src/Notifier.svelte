<script lang="ts">
  import Toast from "./Toast.svelte";

  export let config;
  export let notifications = [];
</script>

<div class="notifier-cont">
  {#each notifications as notification}
    <Toast {notification} />
  {/each}
</div>

<style>
  .notifier-cont {
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
