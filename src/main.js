import { ClassicEditor, Essentials, Bold, Italic, Font, Paragraph } from 'ckeditor5';
import MathType from '@wiris/mathtype-ckeditor5/dist/index.js';

import 'ckeditor5/ckeditor5.css';

function replaceInsertedElement(render) {
    const mathml = WirisPlugin.Parser.codeImgTransform(render.node.outerHTML, 'img2mathml');
    render.node.outerHTML = mathml;
    console.log(mathml);
    console.log(render.node.outerHTML);
}

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Essentials, Bold, Italic, Font, Paragraph, MathType ],
        toolbar: [
            'undo', 'redo', '|', 'bold', 'italic', '|',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|', 'MathType', 'ChemType'
        ]
    } )
    .then((editor)=>{
        const wirisAfterListener = WirisPlugin.Listeners.newListener('onAfterFormulaInsertion', replaceInsertedElement);
        WirisPlugin.Core.addGlobalListener(wirisAfterListener);
    } )
    .catch((error)=>console.log(error));

//https://github.com/wiris/html-integrations/issues/383