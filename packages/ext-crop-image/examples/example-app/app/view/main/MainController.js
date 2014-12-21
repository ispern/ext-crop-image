/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.ux.cropimage.Window'
    ],

    alias: 'controller.main',

    onSelectPicture: function(button, event) {
        var me = this,
            file = event.target.files[0];

        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                me.showImageCropWindow(e.target.result);
            };
        })(file);
        reader.readAsDataURL(file);
    },

    showImageCropWindow: function(dataUrl) {
        var me = this,
            win = Ext.widget('ux-cropimage-window', {
                listeners: {
                    crop: function(src) {
                        me.lookupReference('image').setSrc(src);
                        win.hide();
                        Ext.destroy(win);
                    }
                }
            });
        win.setImage(dataUrl);
    }
});
