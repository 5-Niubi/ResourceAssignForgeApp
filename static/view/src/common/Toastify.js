import { toast } from "react-toastify";

class Toastify {
	info(content) {
		toast.info(content, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}

    error(content) {
		toast.error(content, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}

	success(content) {
		toast.success(content, {
			position: "top-right",
			autoClose: 30000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}

    /**
     * Clear all toast are showing on the screen
     */
    clear(){
        toast.dismiss();
    }
}

export default new Toastify();
