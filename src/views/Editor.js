import { useEffect } from "react";
import grapesjs from "grapesjs";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksFlexbox from "grapesjs-blocks-flexbox";
import grapesjsNavbar from "grapesjs-navbar";
import grapesjsCustomCode from "grapesjs-custom-code";
import "grapesjs/dist/css/grapes.min.css";
import "../app.css";

function Editor() {
	// const token = localStorage.getItem("authTokens");

	// if (token) {
	// 	const decode = jwtDecode(token);
	// }

	useEffect(() => {
		const editor = grapesjs.init({
			container: "#editor",
			height: "100vh",
			plugins: [
				gjsPresetWebpage,
				grapesjsBlocksFlexbox,
				grapesjsNavbar,
				grapesjsCustomCode,
				grapesjsBlocksBasic,
			],
			pluginsOpts: {
				gjsPresetWebpage: {},
				grapesjsBlocksFlexbox: {},
				grapesjsNavbar: {},
				grapesjsCustomCode: {},
				grapesjsBlocksBasic: {},
			},
		});

		editor.BlockManager.add("my-custom-block", {
			label: "Simple Block",
			content: '<div class="my-block">This is a simple block</div>',
			category: "Basic",
		});

		editor.BlockManager.add("hero-section", {
			label: "Hero Section",
			content:
				'<section class="hero"><h1>Welcome to Our Site</h1><p>This is a great place to highlight your website.</p></section>',
			category: "Sections",
		});

		editor.BlockManager.add("feature-section", {
			label: "Feature Section",
			content:
				'<section class="features"><div class="feature"><h2>Feature 1</h2><p>Description</p></div></section>',
			category: "Sections",
		});

		editor.BlockManager.add("testimonials", {
			label: "Testimonials",
			content:
				'<section class="testimonials"><blockquote>Great service!</blockquote></section>',
			category: "Sections",
		});

		editor.BlockManager.add("contact-form", {
			label: "Contact Form",
			content:
				'<form class="contact-form"><input type="text" placeholder="Name"><input type="email" placeholder="Email"><textarea placeholder="Message"></textarea><button type="submit">Send</button></form>',
			category: "Forms",
		});

		// get the HTML and CSS from the editor
		const html = editor.getHtml();
		const css = editor.getCss();
		const components = editor.getComponents();
		console.log(html, css, components);
	}, []);

	return (
		<>
			<div>
				<div id="editor"></div>
			</div>
		</>
	);
}

export default Editor;
