/*
 * File: app/view/ContactFormPanel.js
 *
 * This file was generated by Sencha Architect version 2.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.ContactFormPanel', {
    extend: 'Ext.form.Panel',

    config: {
        id: 'contactform',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'ContactToolBar',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: 'Cancel'
                    },
                    {
                        xtype: 'label',
                        html: '<div style="padding: 0px 30px; color: #fdd309"> Simple Form</div>',
                        ui: 'dark'
                    },
                    {
                        xtype: 'button',
                        itemId: 'SubmitContact',
                        ui: 'forward',
                        text: 'Submit'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Contact',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Fullname',
                        name: 'fullname'
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Gender',
                        name: 'gender',
                        options: [
                            {
                                text: 'Male',
                                value: 'male'
                            },
                            {
                                text: 'Female',
                                value: 'female'
                            }
                        ]
                    },
                    {
                        xtype: 'emailfield',
                        label: 'Email',
                        name: 'email',
                        placeHolder: 'email@example.com'
                    },
                    {
                        xtype: 'numberfield',
                        label: 'Phone',
                        name: 'phone'
                    },
                    {
                        xtype: 'textareafield',
                        height: 138,
                        width: 281,
                        label: 'Inquiry',
                        name: 'inquiry'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onSubmitContactTap',
                event: 'tap',
                delegate: '#SubmitContact'
            }
        ]
    },

    onSubmitContactTap: function(button, e, options) {
        var values = this.getValues();
        var contactData = Ext.create('MyApp.model.ContactForm', {
            fullname: values.fullname,
            email: values.email,
            phone: values.phone,
            inquiry: values.inquiry  
        }),
        errs = contactData.validate(),
        msg = '';

        if (!errs.isValid()) {
            errs.each(function (err) {
                msg += Ext.String.capitalize(err.getField()) + " " + err.getMessage() + '<br/>';
            });
            Ext.Msg.alert('ERROR', msg);
        } else {
            Ext.Ajax.request({
                url: 'inquiry.php',
                params: {
                    fullname: values.fullname,
                    gender: values.gender,
                    email: values.email,
                    phone: values.phone,
                    inquiry: values.inquiry 
                },
                method: 'POST',
                success: this.handleSuccess,
                failure: this.handleError
            });

        } // if



    },

    handleSuccess: function(response, opts) {
        var jsonData = Ext.decode(response.responseText);
        console.log(jsonData);
        //console.log(response.responseText);

    },

    handleError: function(response, opts) {
        console.log('server-side failure with status code ' + response.status);

    }

});