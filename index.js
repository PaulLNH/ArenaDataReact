$(document).ready(function () {
    // load_papa_parse();
    // var parseConfig = {
    //     complete: function(results) {
    //         console.log(results);
    //     },
    //     header: true,
    //     dynamicTyping: true,
    //     delimiter: ";",
    // };
    // var data = Papa.parse('./seed.csv', parseConfig);

    let mapWL = {};

    // var data = $.csv.toObjects('./seed.csv');
    const csvImportButton = $('#csvImportButton');
    const csvImportData = $('#csvImportData');
    const csvImportOptions = {
        "separator": ";"
    };
    let importedData = [];
    let chartData = {
        MapWL: [],
        MMR: [],
    };

    resetDefaults = () => {
        mapWL = {
            game: {
                played: 0,
                wins: 0,
                losses: 0
            },
            RoL: {
                id: 572,
                wins: 0,
                losses: 0,
            },
            DS: {
                id: 617,
                wins: 0,
                losses: 0,
            },
            TA: {
                id: 980,
                wins: 0,
                losses: 0,
            },
            TTP: {
                id: 1134,
                wins: 0,
                losses: 0,
            },
            BRHA: {
                id: 1504,
                wins: 0,
                losses: 0,
            },
            NA: {
                id: 1505,
                wins: 0,
                losses: 0,
            },
            AF: {
                id: 1552,
                wins: 0,
                losses: 0,
            },
            BEA: {
                id: 1672,
                wins: 0,
                losses: 0,
            },
            HP: {
                id: 1825,
                wins: 0,
                losses: 0,
            },
            M: {
                id: 1911,
                wins: 0,
                losses: 0,
            },
        }
    };
    resetDefaults();

    csvImportButton.on('click', event => {
        event.preventDefault();
        importedData = $.csv.toObjects(csvImportData.val(), csvImportOptions);
        console.log(importedData);
        csvImportData.val('');
        M.textareaAutoResize(csvImportData);
        generateMapWLColumnChartData(importedData);
        generateMMRLineChartData(importedData);
    });

    //initialize all modals           
    $('.modal').modal();

    //now you can open modal from code
    $('#modal1').modal('open');

    //or by click on trigger
    $('.modal-trigger').modal();



    // Load the Visualization API and the corechart package.
    google.charts.load('current', {
        'packages': ['corechart', 'line']
    });

    generateMapWLColumnChartData = (data) => {
        data.forEach(match => {
            mapWL.game.played++;
            let win = (match.Victory == "true");
            let dataPoints = [];
            switch (match.Map) {
                case '572':
                    // code for RoL
                    win ? mapWL.RoL.wins++ : mapWL.RoL.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '617':
                    // code for DS
                    win ? mapWL.DS.wins++ : mapWL.DS.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '980':
                    // code for TA
                    win ? mapWL.TA.wins++ : mapWL.TA.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '1134':
                    // code for TTP
                    win ? mapWL.TTP.wins++ : mapWL.TTP.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '1504':
                    // code for BRHA
                    win ? mapWL.BRHA.wins++ : mapWL.BRHA.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '1505':
                    // code for NA
                    win ? mapWL.NA.wins++ : mapWL.NA.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '1552':
                    // code for AF
                    win ? mapWL.AF.wins++ : mapWL.AF.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '1672':
                    // code for BEA
                    win ? mapWL.BEA.wins++ : mapWL.BEA.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '1825':
                    // code for HP
                    win ? mapWL.HP.wins++ : mapWL.HP.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
                case '1911':
                    // code for M
                    win ? mapWL.M.wins++ : mapWL.M.losses++
                    win ? mapWL.game.wins++ : mapWL.game.losses++
                    break;
            }
        });
        dataPoints = [
            ['Map', 'Wins', {
                role: 'annotation'
            }, 'Losses', {
                role: 'annotation'
            }],
            ['Ruins of Lordaeron', parseFloat(mapWL.RoL.wins), 'W', parseFloat(mapWL.RoL.losses), 'L'],
            ['Dalaran Sewers', parseFloat(mapWL.DS.wins), 'W', parseFloat(mapWL.DS.losses), 'L'],
            ['Tol\'Viron Arena', parseFloat(mapWL.TA.wins), 'W', parseFloat(mapWL.TA.losses), 'L'],
            ['Tiger\'s Peak', parseFloat(mapWL.TTP.wins), 'W', parseFloat(mapWL.TTP.losses), 'L'],
            ['Black Rook Hold', parseFloat(mapWL.BRHA.wins), 'W', parseFloat(mapWL.BRHA.losses), 'L'],
            ['Nagrand Arena', parseFloat(mapWL.NA.wins), 'W', parseFloat(mapWL.NA.losses), 'L'],
            ['Ashamane\'s Fall', parseFloat(mapWL.AF.wins), 'W', parseFloat(mapWL.AF.losses), 'L'],
            ['Blade\'s Edge Arena', parseFloat(mapWL.BEA.wins), 'W', parseFloat(mapWL.BEA.losses), 'L'],
            ['Hook Point', parseFloat(mapWL.HP.wins), 'W', parseFloat(mapWL.HP.losses), 'L'],
            ['Mugambala', parseFloat(mapWL.M.wins), 'W', parseFloat(mapWL.M.losses), 'L'],
        ]
        chartData.MapWL = dataPoints;
        google.charts.setOnLoadCallback(drawMapWLColumnChart);
    };

    
    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawMapWLColumnChart() {
        // Stacked bar chart
        let data = google.visualization.arrayToDataTable(chartData.MapWL);
        
        // Set chart options
        let options = {
            'title': 'Wins / Losses by Map',
            // 'width': 600,
            // 'height': 400,
            legend: {
                position: 'top',
                maxLines: 3
            },
            colors: ['#2196F3', 'orange'],
            is3D: true,
            bar: {
                groupWidth: '95%'
            },
            isStacked: true,
            hAxis: {
                minValue: 0
            }
        };
        // Instantiate and draw our chart, passing in some options.
        let chart = new google.visualization.ColumnChart(document.getElementById('MapWLColumnChart'));
        chart.draw(data, options);
        
    }
    
    generateMMRLineChartData = (data) => {
        let MMRData = [];
        data.forEach(match => {
            let dateConverted = new Date();
            dateConverted.setTime(match.Timestamp * 1000);
            let  matchData = [];
            let dateLabel = `${JSON.stringify(dateConverted.getFullYear())}/${JSON.stringify(dateConverted.getMonth())}/${JSON.stringify(dateConverted.getDate())}`
            matchData[0] = dateLabel;
            matchData[1] = parseFloat(match.MMR);
            matchData[2] = parseFloat(match.EnemyMMR)
            MMRData.unshift(matchData);
        });
        chartData.MMR = MMRData;
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(drawMMRLineChart);
    };

    function drawMMRLineChart() {
        console.log(chartData.MMR);
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Date');
        data.addColumn('number', 'Your MMR');
        data.addColumn('number', 'Enemy MMR');
        data.addRows(chartData.MMR);

        let options = {
            chart: {
                title: 'MMR Performance',
            },
            colors: ['#2196F3', 'orange'],
            // width: 600,
            // height: 400
        };

        let chart = new google.charts.Line(document.getElementById('MMRLineChart'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }

});