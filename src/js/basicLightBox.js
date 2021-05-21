import * as basicLightbox from 'basiclightbox';

const instance = basicLightbox.create(`
    <img src="assets/images/image.png" width="800" height="600">
`);

export default instance.show();
