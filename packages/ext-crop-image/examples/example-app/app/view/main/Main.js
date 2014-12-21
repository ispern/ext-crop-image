/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
        'MyApp.view.main.MainController',
        'MyApp.view.main.MainModel',
        'Ext.Img',
        'Ext.form.field.File',
        'Ext.form.field.FileButton'
    ],

    xtype: 'app-main',
    
    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: 'border',

    items: [
        {
            region: 'center',
            xtype: 'form',
            bodyPadding: 10,
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Profile Picture',
                    labelWidth: 100,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'image',
                            reference: 'image',
                            width: 125,
                            height: 125
                        },
                        {
                            xtype: 'box',
                            width: 20
                        },
                        {
                            xtype: 'filebutton',
                            text: 'Select Picture...',
                            listeners: {
                                change: 'onSelectPicture',
                                scope: 'controller'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
