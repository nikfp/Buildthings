import { toast } from '@zerodevx/svelte-toast';

export const successToast = (msg: string) =>
	toast.push({
		msg,
		theme: {
			'--toastBackground': 'lightgreen',
			'--toastColor': 'black',
			'--toastBarBackground': 'olive'
		}
	});

export const warnToast = (msg: string) =>
	toast.push({
		msg,
		theme: {
			'--toastBackground': 'khaki',
			'--toastColor': 'black',
			'--toastBarBackground': 'olive'
		}
	});

export const errorToast = (msg: string) =>
	toast.push({
		msg,
		theme: {
			'--toastBackground': 'lightcoral',
			'--toastColor': 'black',
			'--toastBarBackground': 'darkred'
		}
	});
