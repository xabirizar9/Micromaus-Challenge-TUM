import { SvelteToast, toast, SvelteToastOptions } from "@zerodevx/svelte-toast";

export const error = (message: string, options: SvelteToastOptions = {}) => {
  toast.push(message, {
    theme: {
      "--toastBackground": "var(--error-color)",
      "--toastColor": "var(--error-color-text)",
    },
  });
};

export const info = (message: string, options: SvelteToastOptions = {}) => {
  toast.push(message, {
    theme: {
      "--toastBackground": "var(--primary-color)",
      "--toastColor": "var(--primary-color-text)",
    },
  });
};

export const success = (message: string, options: SvelteToastOptions = {}) => {
  toast.push(message, {
    theme: {
      "--toastBackground": "var(--success-color)",
      "--toastColor": "var(--success-color-text)",
    },
  });
};
