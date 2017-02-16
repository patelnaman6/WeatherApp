/**
 * Created by NAPatel on 13-Feb-17.
 */
Ext.define('MyApp.Application', {
    name: 'MyApp',
    extend: 'Ext.app.Application',
    launch: function () {

        var welcomeMessage = {
            html: '<h1 class="welcome">Welcome to the Weather App</h1><h3 class="sub-heading">This application contains records about the average day temperatures recorded over various months of numerous countries spread across different years.</h3>'
        };

       Ext.define('WeatherData', {
            extend: 'Ext.data.Model',
            fields: ["country", "temp", "date", "id"]
        });

       globals.store3 = Ext.create('Ext.data.Store',{
           model: 'WeatherData',
           autoLoad: true,
           proxy: {
               type: 'ajax',
               url: 'ReadAllRecordsData',
               autoLoad: true,
               reader: {
                   type: 'json'
               }
           }
       });

        Ext.define('ChartData', {
            extend: 'Ext.data.Model',
            fields: ["country"]
        });

        globals.store2 = Ext.create('Ext.data.Store',{
            //fields: ["country", "temp"],
            fields: [{name: 'country'}, {name: 'temp'}],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'ReadChartData',
                autoLoad: true,
                reader: {
                    type: 'json'
                }
            }
        });

        Ext.define('WeatherPoint', {
            extend: 'Ext.data.Model',
            fields: ["country", "temp", "date", "id"]
        });

        globals.store = Ext.create('Ext.data.Store', {
            model: 'WeatherPoint',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'ReadAllRecordsData',
                autoLoad: true,
                reader: {
                    type: 'json'
                }
            }
        });

        globals.viewport = Ext.create('Ext.container.Viewport', {
            layout: 'auto'
        });

        var panel = Ext.create('Ext.grid.Panel', {
            cls: 'grid',
            title: 'Database Data',
            store: globals.store,
            tools: [{
                type: 'plus',
                tooltip: 'Add a record',
                handler: function(click) {
                    var panel = Ext.create('Ext.form.Panel', {
                        title: 'Add Data Form',
                        bodyPadding: 5,
                        width: 600,
                        cls: 'form',
                        floating: true,
                        closable: true,

                        //The form will submit an AJAX request to this URL when submitted
                        url: 'InsertData',

                        // Fields will be arranged vertically, stretched to full width
                        layout: 'auto',

                        // The fields
                        defaultType: 'textfield',
                        items: [{
                            cls: 'add-form-country',
                            fieldLabel: 'Country',
                            name: 'country',
                            allowBlank: false
                        }, {
                            fieldLabel: 'Date',
                            cls: 'add-form-date',
                            name: 'date',
                            xtype: 'datefield',
                            format: 'd-M-Y',
                            maxValue: new Date(),
                            allowBlank: false
                        }, {
                            fieldLabel: 'Temperature',
                            cls: 'add-form-temp',
                            name: 'temp',
                            xtype: 'numberfield',
                            value: 30,
                            allowBlank: false
                        }],

                        // Reset and Submit buttons
                        buttons: [{
                            text: 'Reset',
                            cls: 'add-reset-button',
                            handler: function() {
                                this.up('form').getForm().reset();
                            }
                        }, {
                            text: 'Add',
                            cls: 'add-submit-button',
                            formBind: true, //only enabled once the form is valid
                            disabled: true,
                            handler: function() {
                                var form = this.up('form').getForm();
                                if(form.isValid()) {
                                    console.log("valid form");
                                    form.submit({
                                        success: function(form, action) {
                                            globals.store.reload();
                                            panel.close();
                                            Ext.Msg.alert('Status', 'Record Added Successfully.');
                                        },
                                        failure: function(form, action) {
                                            Ext.Msg.alert('Failed', action.result.msg);
                                        }
                                    });
                                }
                            }
                        }]
                    });
                    panel.show();
                }
            }],
            columns: [
                {text: 'Country', dataIndex: 'country', cls: 'col-country'},
                {text: 'Date', dataIndex: 'date',cls: 'col-date'},
                {text: 'Temperature', dataIndex: 'temp',cls: 'col-temp'},
                {
                    xtype: 'actioncolumn',
                    text: 'Actions',
                    width: 50,
                    margin: 5,
                    items: [{
                        icon: 'resources/images/edit.png',
                        iconCls: 'action-update',
                        tooltip: 'Update',
                        handler: function (grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var country = rec.get('country');
                            var date = rec.get('date');
                            console.log(typeof date);
                            var temp = rec.get('temp');
                            var id = rec.get('id');
                            var updateData;
                            var panel = Ext.create('Ext.form.Panel', {
                                title: 'Update Data Form',
                                //bodyPadding: 5,
                                width: 400,
                                height: 200,
                                cls: 'form',
                                floating: true,
                                closable: true,

                                //The form will submit an AJAX request to this URL when submitted
                                //url: 'UpdateData',

                                // Fields will be arranged vertically, stretched to full width
                                layout: 'auto',

                                // The fields
                                defaultType: 'textfield',
                                items: [{
                                    cls: 'update-form-country',
                                    fieldLabel: 'Country',
                                    name: 'country',
                                    allowBlank: false,
                                    value: country
                                }, {
                                    fieldLabel: 'Date',
                                    cls: 'update-form-date',
                                    name: 'date',
                                    xtype: 'datefield',
                                    maxValue: new Date(),
                                    format: 'd-M-Y',
                                    value: new Date(date),
                                    allowBlank: false
                                }, {
                                    fieldLabel: 'Temperature',
                                    cls: 'update-form-temp',
                                    name: 'temp',
                                    xtype: 'numberfield',
                                    value: temp,
                                    allowBlank: false
                                }],

                                // Reset and Submit buttons
                                buttons: [{
                                    text: 'Reset',
                                    cls: 'update-reset-button',
                                    handler: function () {
                                        this.up('form').getForm().reset();
                                    }
                                }, {
                                    text: 'Update',
                                    cls: 'update-submit-button',
                                    formBind: true, //only enabled once the form is valid
                                    disabled: true,
                                    handler: function () {
                                        var form = this.up('form').getForm();
                                        if (form.isValid()) {
                                            var values = form.getValues();
                                            var country = values['country'];
                                            var date = values['date'];
                                            var temp = values['temp'];
                                            $.ajax({
                                                type: 'PUT',
                                                url: 'UpdateData' + '?' + $.param({"country" : country, "temp" : temp, "date" : date, "id" : id}),
                                                data: updateData,
                                                dataType: 'json',
                                                success: function () {
                                                    grid.getStore().reload();
                                                    panel.close();
                                                    Ext.Msg.alert('Status', 'Record Updated Successfully.');
                                                }
                                            });
                                        }
                                    }
                                }]
                            });
                            panel.show();
                        },
                        scope: this
                    },
                        {
                            icon: 'resources/images/delete.png',
                            iconCls: 'action-delete',
                            tooltip: 'Delete',
                            html: 'delete',
                            handler: function (grid, rowIndex, colIndex) {
                                var rec = grid.getStore().getAt(rowIndex);
                                var country = rec.get('country');
                                var date = rec.get('date');
                                var id = rec.get('id');
                                var deleteData = {
                                    "country": country,
                                    "date": date
                                };
                                $.ajax({
                                    type: 'DELETE',
                                    url: 'DeleteData' + '?' + $.param({"id" : id}),
                                    data: deleteData,
                                    dataType: 'json',
                                    success: function () {
                                        grid.getStore().reload();
                                        Ext.Msg.alert('Status', 'Record Deleted Successfully.');
                                    }
                                });
                            },
                            scope: this
                        }]
                }
            ],
            height: 160,
            width: 360,
            viewConfig: {
                listeners: {
                    cellclick: function( grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                        var country = record.get('country');
                        globals.store3.clearFilter(true);
                        globals.store3.filter("country", country);
                    }
                }
            }
        });

        var chart = Ext.create('Ext.chart.Chart', {
            cls: 'chart',
            width: 700,
            height: 400,
            store: globals.store3,
            axes: [
                {
                    title: 'Temperature',
                    cls: 'chart-temp',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['temp'],
                    minimum: 0,
                    maximum: 100
                },
                {
                    title: 'Date',
                    cls: 'chart-date',
                    type: 'Time',
                    position: 'bottom',
                    fields: ['date'],
                    dateFormat: 'd-m-y'
                }
            ],
            series: [
                {
                    type: 'column',
                    xField: 'date',
                    yField: 'temp'
                }
            ]
        });

        globals.viewport.add(welcomeMessage);
        // globals.viewport.add(buttonHeading);
       /* globals.viewport.add(add);
        globals.viewport.add(update);
        globals.viewport.add(del);
        globals.viewport.add(read);
        globals.viewport.add(statistics);*/
        globals.viewport.add(panel);
        //globals.viewport.add(countryButton);
        globals.viewport.add(chart);

    }
});


/*
Ext.create('Ext.form.Panel', {
    title: 'Add Data Form',
    bodyPadding: 5,
    width: 350,
    cls: 'form',

    //The form will submit an AJAX request to this URL when submitted
    //url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
    layout: 'fit',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
        cls: 'form-country',
        fieldLabel: 'Country',
        name: 'country',
        allowBlank: false
    }, {
        fieldLabel: 'Month',
        cls: 'form-month',
        name: 'month',
        allowBlank: false
    }, {
        fieldLabel: 'Date',
        cls: 'form-date',
        name: 'date',
        xtype: 'datefield',
        maxValue: new Date(),
        allowBlank: false
    }, {
        fieldLabel: 'Temperature',
        cls: 'form-temp',
        name: 'temp',
        xtype: 'numberfield',
        value: 30,
        allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        cls: 'reset-button'
        /!*,
         handler: function() {
         this.up('form').getForm().reset();
         }*!/
    }, {
        text: 'Add',
        cls: 'submit-button',
        formBind: true, //only enabled once the form is valid
        disabled: true
        /!*,
         handler: function() {
         var form = this.up('form').getForm();
         if (form.isValid()) {
         form.submit({
         success: function(form, action) {
         Ext.Msg.alert('Success', action.result.msg);
         },
         failure: function(form, action) {
         Ext.Msg.alert('Failed', action.result.msg);
         }
         });
         }
         }*!/
    }],
    renderTo: viewport
});

Ext.create('Ext.form.Panel', {
    title: 'Update Data Form',
    bodyPadding: 5,
    width: 350,
    cls: 'form',

    //The form will submit an AJAX request to this URL when submitted
    //url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
        cls: 'form-country',
        fieldLabel: 'Country',
        name: 'country',
        allowBlank: false
    }, {
        fieldLabel: 'Month',
        cls: 'form-month',
        name: 'month',
        allowBlank: false
    }, {
        fieldLabel: 'Date',
        cls: 'form-date',
        name: 'date',
        xtype: 'datefield',
        maxValue: new Date(),
        allowBlank: false
    }, {
        fieldLabel: 'Temperature',
        cls: 'form-temp',
        name: 'temp',
        xtype: 'numberfield',
        value: 30,
        allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Reset',
        cls: 'reset-button'
        /!*,
         handler: function() {
         this.up('form').getForm().reset();
         }*!/
    }, {
        text: 'Update',
        cls: 'submit-button',
        formBind: true, //only enabled once the form is valid
        disabled: true
        /!*,
         handler: function() {
         var form = this.up('form').getForm();
         if (form.isValid()) {
         form.submit({
         success: function(form, action) {
         Ext.Msg.alert('Success', action.result.msg);
         },
         failure: function(form, action) {
         Ext.Msg.alert('Failed', action.result.msg);
         }
         });
         }
         }*!/
    }],
    renderTo: viewport
});

Ext.create('Ext.form.Panel', {
    title: 'Add Data Form',
    bodyPadding: 5,
    width: 350,
    cls: 'form',

    //The form will submit an AJAX request to this URL when submitted
    //url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
        cls: 'form-country',
        fieldLabel: 'Country',
        name: 'country',
        allowBlank: false
    },{
        fieldLabel: 'Month',
        cls: 'form-month',
        name: 'month',
        allowBlank: false
    }, {
        fieldLabel: 'Date',
        cls: 'form-date',
        name: 'date',
        xtype: 'datefield',
        maxValue: new Date(),
        allowBlank: false
    }],

    // Reset and Submit buttons
    buttons: [{
        text: 'Submit',
        cls: 'submit-button',
        formBind: true, //only enabled once the form is valid
        disabled: true/!*,
         handler: function() {
         var form = this.up('form').getForm();
         if (form.isValid()) {
         form.submit({
         success: function(form, action) {
         Ext.Msg.alert('Success', action.result.msg);
         },
         failure: function(form, action) {
         Ext.Msg.alert('Failed', action.result.msg);
         }
         });
         }
         }*!/
    }],
    renderTo: viewport
});

Ext.create('Ext.form.Panel', {
    title: 'Add Data Form',
    bodyPadding: 5,
    width: 350,
    cls: 'form',

    //The form will submit an AJAX request to this URL when submitted
    //url: 'save-form.php',

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [{
        cls: 'form-country',
        fieldLabel: 'Country',
        name: 'country',
        allowBlank: false
    },{
        fieldLabel: 'Month',
        cls: 'form-month',
        name: 'month',
        allowBlank: false
    }, {
        fieldLabel: 'Date',
        cls: 'form-date',
        name: 'date',
        xtype: 'datefield',
        maxValue: new Date(),
        allowBlank: false
    }],

    buttons: [{
        text: 'Submit',
        cls: 'submit-button',
        formBind: true, //only enabled once the form is valid
        disabled: true/!*,
         handler: function() {
         var form = this.up('form').getForm();
         if (form.isValid()) {
         form.submit({
         success: function(form, action) {
         Ext.Msg.alert('Success', action.result.msg);
         },
         failure: function(form, action) {
         Ext.Msg.alert('Failed', action.result.msg);
         }
         });
         }
         }*!/
    }],
    renderTo: viewport
});

Ext.define('WeatherData', {
    extend: 'Ext.data.Model',
    fields: ['country', 'month', 'date', 'temperature']
});

var store2 = Ext.create('Ext.data.Store', {
    model: 'WeatherData',
    data: [
        {country: 'India', month: 'Jan', temperature: 58, date: new Date(2011, 0, 8)},
        {country: 'India', month: 'Jan', temperature: 63, date: new Date(2011, 0, 9)},
        {country: 'India', month: 'Jan', temperature: 73, date: new Date(2011, 0, 10)},
        {country: 'India', month: 'Jan', temperature: 78, date: new Date(2011, 0, 11)},
        {country: 'India', month: 'Jan', temperature: 81, date: new Date(2011, 0, 12)},
        {country: 'India', month: 'Jan', temperature: 61, date: new Date(2011, 0, 13)},
        {country: 'India', month: 'Jan', temperature: 23, date: new Date(2011, 0, 14)},
        {country: 'India', month: 'Jan', temperature: 54, date: new Date(2011, 0, 15)},
        {country: 'India', month: 'Jan', temperature: 90, date: new Date(2011, 0, 16)},
        {country: 'India', month: 'Jan', temperature: 56, date: new Date(2011, 0, 17)}
    ]
});

Ext.create('Ext.grid.Panel', {
    cls: 'grid',
    title: 'Database Data',
    store: store2,
    columns: [
        {text: 'Country', dataIndex: 'country'},
        {text: 'Month', dataIndex: 'month'},
        {text: 'Date', dataIndex: 'date'},
        {text: 'Temperature', dataIndex: 'temperature'}
    ],
    height: 200,
    width: 400,
    renderTo: viewport
});

Ext.define('WeatherPoint', {
    extend: 'Ext.data.Model',
    fields: ['temperature', 'date']
});

var store = Ext.create('Ext.data.Store', {
    model: 'WeatherPoint',
    data: [
        {temperature: 58, date: new Date(2011, 0, 8)},
        {temperature: 63, date: new Date(2011, 0, 9)},
        {temperature: 73, date: new Date(2011, 0, 10)},
        {temperature: 78, date: new Date(2011, 0, 11)},
        {temperature: 81, date: new Date(2011, 0, 12)},
        {temperature: 61, date: new Date(2011, 0, 13)},
        {temperature: 23, date: new Date(2011, 0, 14)},
        {temperature: 54, date: new Date(2011, 0, 15)},
        {temperature: 90, date: new Date(2011, 0, 16)},
        {temperature: 56, date: new Date(2011, 0, 17)}
    ]
});

Ext.create('Ext.Button', {
    cls: 'country',
    text: 'Country',
    renderTo: viewport,
    arrowAlign: 'right',
    menu: [
        {text: 'India'},
        {text: 'China'},
        {text: 'Bhutan'},
        {text: 'Nepal'}
    ]
});

Ext.create('Ext.chart.Chart', {
    cls: 'chart',
    renderTo: viewport,
    width: 400,
    height: 300,
    store: store,
    axes: [
        {
            title: 'Temperature',
            type: 'Numeric',
            position: 'left',
            fields: ['temperature'],
            minimum: 0,
            maximum: 100
        },
        {
            title: 'Date',
            type: 'Time',
            position: 'bottom',
            fields: ['date'],
            dateFormat: 'd-m-y'
        }
    ],
    series: [
        {
            type: 'column',
            xField: 'date',
            yField: 'temperature'
        }
    ]
});

Ext.create('Ext.Button', {
    cls: 'month',
    text: 'Month',
    renderTo: viewport,
    arrowAlign: 'right',
    menu: [
        {text: 'January'}, {text: 'February'}, {text: 'March'}, {text: 'April'},
        {text: 'May'}, {text: 'June'}, {text: 'July'}, {text: 'August'},
        {text: 'September'}, {text: 'October'}, {text: 'November'}, {text: 'December'}
    ]
});*/
