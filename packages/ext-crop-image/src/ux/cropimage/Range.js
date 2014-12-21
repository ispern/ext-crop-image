/**
 *
 *
 * @class Ext.ux.cropimage.Range
 * @extend Ext.window.Window
 */
Ext.define('Ext.ux.cropimage.Range', {
    extend: 'Ext.window.Window',
    alias: 'widget.ux-cropimage-range',

    layout: 'fit',
    ui: 'croprange',
    width: 250,
    height: 250,
    minWidth: 150,
    mixHeight: 150,
    maxWidth: 250,
    maxHeight: 250,

    constrain: true,
    header: false,
    shadow: false,
    ghost: false,

    resizable: {
        preserveRatio: true
    },

    privates: {

        /**
         * @private
         * Override Component.initDraggable.
         * Panel (and subclasses) use the header element as the delegate.
         */
        initSimpleDraggable: function() {
            var me = this,
                ddConfig = Ext.applyIf({
                    el: me.body
                }, me.draggable),
                dd;

            // Add extra configs if Window is specified to be constrained
            if (me.constrain || me.constrainHeader) {
                ddConfig.constrain = me.constrain;
                ddConfig.constrainDelegate = me.constrainHeader;
                ddConfig.constrainTo = me.constrainTo || me.container;
            }

            dd = me.dd = new Ext.util.ComponentDragger(me, ddConfig);
            me.relayEvents(dd, [
                'dragstart',
                'drag',
                'dragend'
            ]);
            if (me.maximized) {
                dd.disable();
            }
        }
    }
});