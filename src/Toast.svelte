<script lang="ts">
  export let notification: AchievementNotification;
</script>

<aside>
  <div>
    <img src={notification.iconUrl} alt="" />
  </div>
  <div>
    <h3>{notification.title}</h3>
    <small>{notification.achievedAt}</small>
  </div>
</aside>

<style>
  aside {
    position: relative;
    width: 300px;
    border-radius: 20px;
    bottom: 100%;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.08);
    margin: 20px;
    padding: 10px;
    display: flex;
    flex-direction: row;
    vertical-align: middle;
  }
  img {
    height: 50px;
    width: 50px;
  }
  h3 {
    margin: 0;
  }
</style>
