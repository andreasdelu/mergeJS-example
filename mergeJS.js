function mergeInit(customProps = {}) {
	/* Default Values */
	let props = {
		container: "",
		mergeAmount: 1,
		sharpness: 30,
		childColor: "transparent",
		inverted: false,
	};

	/* Replace default values for the custom values set by user */

	for (const key in customProps) {
		if (Object.hasOwnProperty.call(customProps, key)) {
			props[key] = customProps[key];
		}
	}

	/* Check if container is set, throw error if not present */

	if (props.container === "" || !document.querySelector(props.container)) {
		console.error("MergeJS Error: No container specified/found");
		return;
	}

	/* Create merge container and copy contents from container to new merge container */

	let container = document.querySelector(props.container);

	container.style.mixBlendMode = props.inverted ? "screen" : "multiply";

	let mergeContainer = document.createElement("div");
	mergeContainer.classList.add("mergeContainer");
	let children = [...container.children];
	children.forEach((child) => {
		child.style.filter = `blur(${props.mergeAmount}px)`;
		child.style.width = `${props.mergeAmount + child.offsetWidth}px`;
		child.style.height = `${props.mergeAmount + child.offsetHeight}px`;

		child.style.backgroundColor = props.inverted ? "#fff" : "#000";
		mergeContainer.appendChild(child);
	});
	container.innerHTML = "";
	container.appendChild(mergeContainer);

	/* Set and add container style */

	let mergeStyle = {
		backgroundColor: props.inverted ? "#000" : "#fff",
		filter: `contrast(${props.sharpness})`,
		width: "100%",
		height: "100%",
	};

	for (const key in mergeStyle) {
		if (Object.hasOwnProperty.call(mergeStyle, key)) {
			mergeContainer.style[key] = mergeStyle[key];
		}
	}

	/* Create overlay to color children */

	let childOverlay = document.createElement("div");
	childOverlay.classList.add("mergeChildOverlay");

	let childOverlayStyle = {
		background: props.childColor,
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		mixBlendMode: props.inverted ? "multiply" : "screen",
	};

	for (const key in childOverlayStyle) {
		if (Object.hasOwnProperty.call(childOverlayStyle, key)) {
			childOverlay.style[key] = childOverlayStyle[key];
		}
	}

	container.appendChild(childOverlay);
}
