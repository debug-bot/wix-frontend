// components/GrapesJSEditor.js
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import 'grapesjs/dist/css/grapes.min.css';
import gjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsBlocksBasic from "grapesjs-blocks-basic";
import axios from 'axios';
const swal = require("sweetalert2");



const GrapesJSEditor = ({templateId, userId}) => {
    const [section, setSection] = useState({});

    const editorRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/store/website/${userId}/${templateId}/`);
                // setsection section 1
                setSection(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchData();
    }, []);




    useEffect(() => {
        const grapesjs = require('grapesjs');
        const editor = grapesjs.init({
            container: '#gjs',
            fromElement: true,
            width: 'auto',
            height: '100vh',
            storageManager: false,
            plugins: [gjsPresetWebpage, grapesjsBlocksBasic],
            pluginsOpts: {
              gjsPresetWebpage: { /* options for the plugin */ },
              grapesjsBlocksBasic: {}
            },

            canvas: {
				scripts: [
					"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
				],
				// The same would be for external styles
                styles: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
                    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
                ],
			},

            // Add more configurations here
        });

        // Set the editor to the state
        editorRef.current = editor;

        editor.BlockManager.add('offers-block', {
    label: 'Offers Section',
    content: `
        <section class="container mt-5">
            <h2 class="text-center">Offers</h2>
            <p class="text-center">Welcome to our store! We specialize in offering the best products for your needs. Our commitment to quality and customer service sets us apart.</p>
        </section>
    `,
    category: 'Basic',
});



editor.Panels.addButton('options', {
    id: 'save-btn',
    className: 'fa fa-save',
    command: 'save-db',
    attributes: { title: 'Save' }
});


// add back button
editor.Panels.addButton('options', {
    id: 'back-btn',
    className: 'fa fa-arrow-left',
    command: 'go-back',
    attributes: { title: 'Go back' }
});

editor.Commands.add('go-back', {
    run: function(editor, sender) {
        sender && sender.set('active', 0); // deactivate the button
        window.history.back();
    }
});



editor.Commands.add('save-db', {
    run: function(editor, sender) {
        sender && sender.set('active', 0); // deactivate the button

        const section1 = editor.DomComponents.getWrapper().find('.t-section1')[0];
        const section2 = editor.DomComponents.getWrapper().find('.t-section2')[0];
        const section3 = editor.DomComponents.getWrapper().find('.t-section3')[0];
        const section4 = editor.DomComponents.getWrapper().find('.t-section4')[0];

        // axios put request
        const putData = async (e) => {
            try {
                if (section1 && section2 && section3 && section4) {
                    const response = await axios.put(`http://127.0.0.1:8000/store/website/${userId}/${templateId}/`,{
                        user: userId,
                        section1: section1.toHTML(),
                        section2: section2.toHTML(),
                        section3: section3.toHTML(),
                        section4: section4.toHTML(),
                        section8: editor.getCss(),
                    });

                    console.log(response.data);
                    swal.fire({
                        title: 'Success!',
                        text: 'Template updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });

                } else {
                    swal.fire({
                        title: 'Error!',
                        text: 'Please add all sections to the template!',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }

                
                // Handle success (e.g., show a message)
            } catch (error) {
                console.error('Error updating template:', error);
                // Handle error (e.g., show error message)
            }
        };

        putData();
        
        

        // Add your code here to handle the saving process
        // For example, sending the HTML/CSS to a server
    }
});
editor.addStyle(`${section.section8}`);
editor.addComponents(`${section.section1}`);
editor.addComponents(`${section.section2}`);
editor.addComponents(`${section.section3}`);
editor.addComponents(`${section.section4}`);

        

        // Clean up
        return () => {
            editorRef.current && editorRef.current.destroy();
        };
    }, [section]);


    return (<>
   <div id="gjs"></div>
 </>
 
 )
};

export default dynamic(() => Promise.resolve(GrapesJSEditor), {
    ssr: false,
});

