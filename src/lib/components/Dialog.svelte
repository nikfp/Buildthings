<script lang="ts">
  import 'agnostic-svelte/css/common.min.css';
  import { Dialog } from "agnostic-svelte";

  export let title: string;

  let dialogInstance: Dialog;
  const assignDialogInstance = (ev: any) => {
    dialogInstance = ev.detail.instance;
  };

  export const openDialog = () => {
    if (dialogInstance) {
      dialogInstance.show();
    }
  };

  export const closeDialog = () => {
    if(dialogInstance) {
      dialogInstance.hide();
    }
  }
</script>

<Dialog {title} id="a11y-dialog" dialogRoot="#dialog-root" closeButtonLabel="My close button label" closeButtonPosition="last" titleId="uniqueTitleId" role="dialog" classNames={{ title: 'h4 mbe18 flex justify-center' }} isAnimationFadeIn isAnimationSlideUp on:instance={assignDialogInstance} >
  {#if dialogInstance }
    <slot />
  {/if}
</Dialog>