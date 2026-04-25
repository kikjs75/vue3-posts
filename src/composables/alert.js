import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export function useAlert() {
	const { alerts } = storeToRefs(useAlertStore());

	// 1)
	// const { vAlert, vSuccess, vError } = useAlertStore();
	// 2)
	const alertStore = useAlertStore();
	const { vAlert, vSuccess, vError } = alertStore;

	return {
		alerts,
		vAlert,
		vSuccess,
		vError,
	};
}
