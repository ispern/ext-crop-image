Ext.define('Ext.ux.cropimage.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.ux-cropimage-window',

    requires: [
        'Ext.ux.cropimage.Range'
    ],

    bodyPadding: 10,
    modal: true,

    imageMaxWidth: 400,
    imageMaxHeight: 400,

    items: [
        {
            xtype: 'container',
            itemId: 'imageContainer',
            layout: 'fit',
            items: [
                {
                    xtype: 'image',
                    itemId: 'img'
                },
                {
                    xtype: 'ux-cropimage-range',
                    itemId: 'cropWindow',
                    src: Ext.BLANK_IMAGE_URL
                }
            ]
        }
    ],

    initComponent: function() {
        var me = this;
        Ext.apply(me, {
            buttons: [
                {
                    text: 'Set Picture',
                    handler: me.cropPicture,
                    scope: me
                }
            ]
        });

        me.callParent();
    },

    setImage: function(src) {
        var me = this,
            imgCmp = me.down('#img'),
            cropWindow = me.down('#cropWindow'),
            image = new Image();

        image.onload = function() {
            me.setImageSize(image.width, image.height);
            imgCmp.setSrc(src);
            me.show();
            cropWindow.show();
        };
        image.src = src;
    },

    setImageSize: function(width, height) {
        var me = this,
            img = me.down('#img');
        if (width > height) {
            img.setMaxWidth(Math.min(width, me.imageMaxWidth));
        } else {
            img.setMaxHeight(Math.min(height, me.imageMaxHeight));
        }
    },

    cropPicture: function() {
        var me = this,
            img = me.down('#img'),
            cropWindow = me.down('#cropWindow'),
            xy = cropWindow.getOffsetsTo(me.down('#imageContainer')),
            width = img.getWidth(),
            height = img.getHeight(),
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();

        // resize
        canvas.width = width;
        canvas.height = height;
        context.drawImage(img.el.dom, 0, 0, width, height);
        image.onload = function() {
            width = cropWindow.getWidth();
            height = cropWindow.getHeight();

            // crop
            canvas.width = width;
            canvas.height = height;
            context.drawImage(image, xy[0], xy[1], width, height, 0, 0, width, height);

            me.fireEvent('crop', canvas.toDataURL(), me);
        };
        image.src = canvas.toDataURL();
    },

    hide: function() {
        var me = this;
        me.down('#cropWindow').hide();
        me.callParent(arguments);
    }
});