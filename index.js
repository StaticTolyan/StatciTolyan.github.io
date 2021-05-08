var lang = {
    "lengthMenu": "Показати _MENU_ записів",
    "infoFiltered": "(відфільтровано з _MAX_ записів)",
    "search": "Пошук:",
    "paginate": {
        "first": "<<",
        "previous": "<",
        "next": ">",
        "last": ">>"
    },
    "aria": {
        "sortAscending": ": активуйте, щоб сортувати колонку за зростанням",
        "sortDescending": ": активуйте, щоб сортувати колонку за спаданням"
    },
    "autoFill": {
        "cancel": "Відміна",
        "fill": "Заповнити всі клітинки з <i>%d<\/i>",
        "fillHorizontal": "Заповнити клітинки горизонтально",
        "fillVertical": "Заповнити клітинки вертикально"
    },
    "buttons": {
        "collection": "Список <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Видимість колонок",
        "colvisRestore": "Відновити видимість",
        "copy": "Копіювати",
        "copyKeys": "Нажміть ctrl або u2318 + C щоб копіювати інформацію з таблиці до вашого буферу обміну.<br \/><br \/>Щоб відмінити нажміть на це повідомлення або Esc",
        "copySuccess": {
            "1": "Скопійовано 1 рядок в буфер обміну",
            "_": "Скопійовано %d рядків в буфер обміну"
        },
        "copyTitle": "Копіювати в буфер обміну",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Показати усі рядки",
            "1": "Показати 1 рядок",
            "_": "Показати %d рядки"
        },
        "pdf": "PDF",
        "print": "Друкувати"
    },
    "emptyTable": "Ця таблиця не містить даних",
    "info": "Показано від _START_ по _END_ з _TOTAL_ записів",
    "infoEmpty": "Показано від 0 по 0 з 0 записів",
    "infoThousands": ",",
    "loadingRecords": "Завантаження",
    "processing": "Опрацювання...",
    "searchBuilder": {
        "add": "Додати умову",
        "button": {
            "0": "Розширений пошук",
            "_": "Розширений пошук (%d)"
        },
        "clearAll": "Очистити все",
        "condition": "Умова",
        "conditions": {
            "date": {
                "after": "Після",
                "before": "До",
                "between": "Між",
                "empty": "Пусто",
                "equals": "Дорівнює",
                "not": "Не",
                "notBetween": "Не між",
                "notEmpty": "Не пусто"
            },
            "number": {
                "between": "Між",
                "empty": "Пусто",
                "equals": "Дорівнює",
                "gt": "Більше ніж",
                "gte": "Більше або дорівнює",
                "lt": "Менше ніж",
                "lte": "Менше або дорівнює",
                "not": "Не",
                "notBetween": "Не між",
                "notEmpty": "Не пусто"
            },
            "string": {
                "contains": "Містить",
                "empty": "Пусто",
                "endsWith": "Закінчується на",
                "equals": "Дорівнює",
                "not": "Не",
                "notEmpty": "Не пусто",
                "startsWith": "Починається з"
            }
        },
        "data": "Параметр",
        "deleteTitle": "Видалити правило фільтрування",
        "leftTitle": "Відступні критерії",
        "logicAnd": "I",
        "logicOr": "Або",
        "rightTitle": "Відступні критерії",
        "title": {
            "0": "Розширений пошук",
            "_": "Розширений пошук (%d)"
        },
        "value": "Значення"
    },
    "searchPanes": {
        "clearMessage": "Очистити все",
        "collapse": {
            "0": "Пошукові Панелі",
            "_": "Пошукові Панелі (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Немає Пошукових Панелей",
        "loadMessage": "Завантаження Пошукових Панелей",
        "title": "Активній фільтри - %d"
    },
    "select": {
        "rows":{
            "1": "%d рядок вибрано",
            "_": "%d рядків вибрано"
        },
        "cells": {
            "1": "1 клітинку вибрано",
            "_": "%d клітинок вибрано"
        },
        "columns": {
            "1": "1 колонку вибрано",
            "_": "%d колонок вибрано"
        }
    },
    "thousands": ",",
    "zeroRecords": "Не знайдено жодних записів"
};

$(document).ready(function() {
    var final = $('#final').DataTable( {
        language: lang,
        responsive: true,
        fixedHeader: true,
        fixedColumns: true,
        buttons: [
            'colvis',
            {
                extend: 'collection',
                text: 'Експорт',
                buttons: [ 'excel', 
                    {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        }
                    },
                    orientation: 'landscape',
                    title: ''
                    }
                    , 'print']
            }            
        ],
        dom: 'Qlfrtip',
        lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "Всі"] ]
    } );
    final.buttons().container()
    .appendTo( $('#finalbtns') );

    var prev = $('#prev').DataTable( {
        language: {
            "lengthMenu": "Показати _MENU_ записів",
            "infoFiltered": "(відфільтровано з _MAX_ записів)",
            "search": "Пошук:",
            "paginate": {
                "first": "<<",
                "previous": "<",
                "next": ">",
                "last": ">>"
            },
            "aria": {
                "sortAscending": ": активуйте, щоб сортувати колонку за зростанням",
                "sortDescending": ": активуйте, щоб сортувати колонку за спаданням"
            },
            "autoFill": {
                "cancel": "Відміна",
                "fill": "Заповнити всі клітинки з <i>%d<\/i>",
                "fillHorizontal": "Заповнити клітинки горизонтально",
                "fillVertical": "Заповнити клітинки вертикально"
            },
            "buttons": {
                "collection": "Список <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
                "colvis": "Видимість колонок",
                "colvisRestore": "Відновити видимість",
                "copy": "Копіювати",
                "copyKeys": "Нажміть ctrl або u2318 + C щоб копіювати інформацію з таблиці до вашого буферу обміну.<br \/><br \/>Щоб відмінити нажміть на це повідомлення або Esc",
                "copySuccess": {
                    "1": "Скопійовано 1 рядок в буфер обміну",
                    "_": "Скопійовано %d рядків в буфер обміну"
                },
                "copyTitle": "Копіювати в буфер обміну",
                "csv": "CSV",
                "excel": "Excel",
                "pageLength": {
                    "-1": "Показати усі рядки",
                    "1": "Показати 1 рядок",
                    "_": "Показати %d рядки"
                },
                "pdf": "PDF",
                "print": "Друкувати"
            },
            "emptyTable": "Ця таблиця не містить даних",
            "info": "Показано від _START_ по _END_ з _TOTAL_ записів",
            "infoEmpty": "Показано від 0 по 0 з 0 записів",
            "infoThousands": ",",
            "loadingRecords": "Завантаження",
            "processing": "Опрацювання...",
            "searchBuilder": {
                "add": "Додати умову",
                "button": {
                    "0": "Розширений пошук",
                    "_": "Розширений пошук (%d)"
                },
                "clearAll": "Очистити все",
                "condition": "Умова",
                "conditions": {
                    "date": {
                        "after": "Після",
                        "before": "До",
                        "between": "Між",
                        "empty": "Пусто",
                        "equals": "Дорівнює",
                        "not": "Не",
                        "notBetween": "Не між",
                        "notEmpty": "Не пусто"
                    },
                    "number": {
                        "between": "Між",
                        "empty": "Пусто",
                        "equals": "Дорівнює",
                        "gt": "Більше ніж",
                        "gte": "Більше або дорівнює",
                        "lt": "Менше ніж",
                        "lte": "Менше або дорівнює",
                        "not": "Не",
                        "notBetween": "Не між",
                        "notEmpty": "Не пусто"
                    },
                    "string": {
                        "contains": "Містить",
                        "empty": "Пусто",
                        "endsWith": "Закінчується на",
                        "equals": "Дорівнює",
                        "not": "Не",
                        "notEmpty": "Не пусто",
                        "startsWith": "Починається з"
                    }
                },
                "data": "Параметр",
                "deleteTitle": "Видалити правило фільтрування",
                "leftTitle": "Відступні критерії",
                "logicAnd": "I",
                "logicOr": "Або",
                "rightTitle": "Відступні критерії",
                "title": {
                    "0": "Розширений пошук",
                    "_": "Розширений пошук (%d)"
                },
                "value": "Значення"
            },
            "searchPanes": {
                "clearMessage": "Очистити все",
                "collapse": {
                    "0": "Пошукові Панелі",
                    "_": "Пошукові Панелі (%d)"
                },
                "count": "{total}",
                "countFiltered": "{shown} ({total})",
                "emptyPanes": "Немає Пошукових Панелей",
                "loadMessage": "Завантаження Пошукових Панелей",
                "title": "Активній фільтри - %d"
            },
            "select": {
                "rows":{
                    "1": "%d рядок вибрано",
                    "_": "%d рядків вибрано"
                },
                "cells": {
                    "1": "1 клітинку вибрано",
                    "_": "%d клітинок вибрано"
                },
                "columns": {
                    "1": "1 колонку вибрано",
                    "_": "%d колонок вибрано"
                }
            },
            "thousands": ",",
            "zeroRecords": "Не знайдено жодних записів"
        },
        responsive: true,
        fixedHeader: true,
        fixedColumns: true,
        buttons: [
            'colvis',
            {
                extend: 'collection',
                text: 'Експорт',
                buttons: [ 'excel', 
                    {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        }
                    },
                    orientation: 'landscape',
                    title: ''
                    }
                    , 'print']
            }            
        ],
        dom: 'Qlfrtip',
        lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "Всі"] ]
    } );
    prev.buttons().container()
    .appendTo( $('#prevbtns') );

    var finalData = final.rows().data();
    var prevData = prev.rows().data();
 

    var vyshi = final.column(3).data().unique();

    var top = new Array(vyshi.length);
    for (var i = 0; i < top.length; i++) {
        top[i] = new Array(15).fill(0);
    }

    for (let j = 0; j < vyshi.length; j++) {
        k=0;
        za=0;
        a=0;
        ya=0;
        v=0;
        Ga=0;
        Ba=0;
        bal=0;
        for (let i = 0; i < finalData.length; i++) {
            if(finalData[i][3] == vyshi[j]){
                if(finalData[i][8]== "Зразкова акредитація"){
                    za++;
                    Ga++;
                }
                if(finalData[i][8]== "Акредитація"){
                    a++;
                    Ga++;
                }
                if(finalData[i][8]== "Умовна (відкладена) акредитація"){
                    ya++;
                    Ba++;
                }
                if(finalData[i][8]== "Відмова в акредитації"){
                    v++;
                    Ba++;
                }
                k++;
            } 
        }
        top[j][0]=vyshi[j];
        top[j][1]=k;
        top[j][2]=za;
        top[j][3]=Math.round((za/k)*100) + '%';
        top[j][4]=a;
        top[j][5]=Math.round((a/k)*100) + '%';
        top[j][6]=ya;
        top[j][7]=Math.round((ya/k)*100) + '%';
        top[j][8]=v;
        top[j][9]=Math.round((v/k)*100) + '%';
        top[j][10]=Ga;
        top[j][11]=Math.round((Ga/k)*100) + '%';
        top[j][12]=Ba;
        top[j][13]=Math.round((Ba/k)*100) + '%';
        top[j][14]=a+za*5+ya*(-3)+v*(-10);
    }
    

    
    
    var TOPtable = $('#Top').DataTable( {
        language: lang,
        responsive: true,
        fixedHeader: true,
        fixedColumns: true,
        buttons: [
            'colvis',
            {
                extend: 'collection',
                text: 'Експорт',
                buttons: [ 'excel', 
                    {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        modifier: {
                            page: 'current'
                        }
                    },
                    orientation: 'landscape',
                    title: ''
                    }
                    , 'print']
            }            
        ],
        dom: 'Qlfrtip',
        lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "Всі"] ],
        data: top,
        columns: [
            { title: 'Назва Університету' },
            { title: 'Справ' },
            { title: 'Зразкових'},
            { title: '% Зразкових'},
            { title: 'Акредитацій'},
            { title: '% Акредитацій'},
            { title: 'Умовних'},
            { title: '% Умовних'},
            { title: 'Відмов'},
            { title: '% Відмов'},
            { title: 'Успішних'},
            { title: '% Успішних'},
            { title: 'Неуспішних'},
            { title: '% Неуспішних'},
            { title: 'БАЛ' }
        ]
    } );
    TOPtable.buttons().container()
    .appendTo( $('#topbtns') );
} );