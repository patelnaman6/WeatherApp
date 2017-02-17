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
                type:'refresh',
                tooltip: 'Refresh form Data',
                // hidden:true,
                handler: function(event, toolEl, panelHeader) {
                    // refresh logic
                    globals.store3.clearFilter();
                    globals.store3.reload();
                }
            },{
                type: 'plus',
                tooltip: 'Add a record',
                handler: function(click) {
                    var panel = Ext.create('Ext.form.Panel', {
                        title: 'Add Data Form',
                        bodyPadding: 5,
                        width: 350,
                        height: 160,
                        cls: 'form',
                        floating: true,
                        closable: true,
                        url: 'InsertData',
                        layout: 'auto',
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
                                            globals.store3.clearFilter();
                                            globals.store3.reload();
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
                {text: 'Date', dataIndex: 'date',cls: 'col-date', xtype: 'datecolumn', format: 'd-M-Y'},
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
                                width: 350,
                                height: 160,
                                cls: 'form',
                                floating: true,
                                closable: true,

                                layout: 'auto',
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
                                                    globals.store3.reload();
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
                                        globals.store3.reload();
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
            animate: true,
            store: globals.store3,
            axes: [
                {
                    title: 'Temperature',
                    cls: 'chart-temp',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['temp'],
                    minimum: 0,
                    maximum: 100,
                    majorTickSteps :1,
                    minorTickSteps :1,
                    adjustMinimumByMajorUnit : true,
                    adjustMaximumByMinorUnit : true
                },
                {
                    title: 'Date',
                    cls: 'chart-date',
                    type: 'Category',
                    position: 'bottom',
                    fields: ['date'],
                    stringformat: 'd-M-Y',
                    majorTickSteps :1,
                    minorTickSteps :1,
                    adjustMinimumByMajorUnit : true,
                    adjustMaximumByMinorUnit : true
                }
            ],
            series: [
                {
                    highlight: true,
                    tips: {
                        trackMouse: true,
                        width: 175,
                        height: 28,
                        renderer: function(storeItem, item) {
                            this.setTitle('Temp: '+storeItem.get('temp') + '   Date: ' + storeItem.get('date'));
                        }
                    },
                    type: 'column',
                    xField: 'date',
                    yField: 'temp'
                }
            ]
        });

        globals.viewport.add(welcomeMessage);
        globals.viewport.add(panel);
        globals.viewport.add(chart);

    }
});