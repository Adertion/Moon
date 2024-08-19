/*** Draw START ***/
var draw;
//var draw_array = new Array();
var drawSource = new ol.source.Vector({ wrapX: false });
var drawLayer = new ol.layer.Vector();
//var drawResInfoArray = new Array();
//var findResInfoArray = new Array();
var intersectingFeatures = [];  //搜索相交要素
var intersectingLayer = new ol.layer.Vector();

//开始绘制-结束绘制
function draw_start() {
    var start_or_end = document.getElementById('draw_start').innerHTML;

    if (start_or_end == '开始绘制') {
        addInteraction();  //添加绘制工具
        document.getElementById('draw_start').innerHTML = '结束绘制';
    }
    else {
        //drawLayer.getSource().clear();
        map.removeInteraction(draw);  //移除绘制工具
        document.getElementById('draw_start').innerHTML = '开始绘制';
    }
}

//添加绘制工具
function addInteraction() {
    var draw_method = document.getElementById('draw_method').value;  //绘制方法

    drawLayer = new ol.layer.Vector({
        source: drawSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 4,
                fill: new ol.style.Fill({
                    color: '#ff0000'
                })
            })
        })
    });
    map.addLayer(drawLayer);

    draw = new ol.interaction.Draw({
        //绘制层数据源
        source: drawSource,
        /** @type {ol.geom.GeometryType}几何图形类型 */
        type: draw_method,
        free: false
    });
    map.addInteraction(draw);
}

//更新绘制方法
function draw_method_change() {
    if (document.getElementById('draw_start').innerHTML == '结束绘制') {
        map.removeInteraction(draw);  //移除绘制工具
        addInteraction();  //添加绘制工具
    }
}
/*** Draw END ***/


/*** Clear START ***/
function draw_clear() {
    drawLayer.getSource().clear();  //清空绘制图层
    map.removeLayer(intersectingLayer);  //清空交互表格中所查询的图层
}
/*** Clear END ***/


/*** Search START ***/
//开始搜索
function search_start() {
    var search_range = document.getElementById('search_range').value;
    intersectingFeatures = [];  //相交要素重置

    if (search_range == 'all') {
        //确定坐标系
        var proj;
        if (po_now == 'ESRI:104903') {
            proj = "moon2000/";
        } else if (po_now == 'ESRI:103877') {
            proj = "north/";
        } else if (po_now == 'ESRI:103878') {
            proj = "south/";
        } else if (po_now == 'ESRI:103880') {
            proj = "near/";
        } else if (po_now == 'ESRI:103879') {
            proj = "far/";
        }

        // 显示加载动画
        showLoader();

        var ajaxRequests = [];

        for (var k = 0; k < display1_element.length; k++) {
            var value_name;
            if (display1_element[k][0] == "FEATURED_MOSAICS_180") {
                value_name = ["FEATURED_MOSAICS_EQ_180.json", "FEATURED_MOSAICS_NP_180.json", "FEATURED_MOSAICS_SP_180.json"]
            } else if (display1_element[k][0] == "STEREO_OBSERVATIONS_180") {
                value_name = ["STEREO_OBSERVATIONS_EQ_180.json", "STEREO_OBSERVATIONS_NP_180.json", "STEREO_OBSERVATIONS_SP_180.json"]
            } else if (display1_element[k][0] == "LROC_5TO20KM_CRATERS_180") {
                value_name = ["LROC_5TO20KM_CRATERS_0TO90E_180.json", "LROC_5TO20KM_CRATERS_0TO90W_180.json", "LROC_5TO20KM_CRATERS_90ETO180E_180.json", "LROC_5TO20KM_CRATERS_90WTO180W_180.json", "LROC_5TO20KM_CRATERS_NPOLE_180.json", "LROC_5TO20KM_CRATERS_SPOLE_180.json"];
            } else if (display1_element[k][0] == "grid_age_craterstats3") {  // 到栅格就停止
                break;
            } else {
                value_name = [display1_element[k][0] + ".json"];
            }

            // 读取json文件
            value_name.forEach(function (vn, i) {
                var ajaxRequest = new Promise(function (resolve, reject) {
                    var layer_i = k;  //这一步很重要！由于是异步请求，如果直接将k写入features_intersect函数参数，则会导致k最后再传输（k=19），故需要及时传输k变量
                    $.ajax({
                        url: "shp/" + proj + vn,
                        //async: false,  //不能同步响应
                        success: function (data) {
                            //为每个feature添加type
                            var features = (new ol.format.GeoJSON()).readFeatures(JSON.stringify(data));
                            var drawFeatures = drawLayer.getSource().getFeatures(); // 获取drawLayer中的要素
                            features_intersect(features, drawFeatures, layer_i);  //检查重合
                            resolve();  // 当异步操作成功时，解决Promise
                        },
                        error: function (error) {
                            reject(error);  // 当异步操作失败时，拒绝Promise
                        }
                    });
                });
                ajaxRequests.push(ajaxRequest);
            });
        }

        // 当所有异步操作都完成时，隐藏加载动画
        Promise.allSettled(ajaxRequests).then(function () {
            hideLoader();
            search_result_show();  //加载表格
        }).catch(function (error) {
            //console.error('Error:', error);
        });
    }
    else {
        var drawFeatures = drawLayer.getSource().getFeatures();  //图层drawLayer中的要素

        // 遍历图层OverLayers中的要素
        for (var k = 0; k < OverLayers_num; k++) {
            var OLFeatures = OverLayers[k].getSource().getFeatures();
            features_intersect(OLFeatures, drawFeatures, k);
        }

        search_result_show();  //加载表格
    }

    
}

//搜索FeatureA与FeatureB的相交
function features_intersect(FeaturesA, FeaturesB, Layer_num) {
    // 遍历图层OverLayers中的要素
    for (var i = 0; i < FeaturesA.length; i++) {
        var FeatureA = FeaturesA[i];

        // 遍历图层drawLayer中的要素
        for (var j = 0; j < FeaturesB.length; j++) {
            var FeatureB = FeaturesB[j];

            // 检查两个要素是否相交
            if (FeatureA.getGeometry().intersectsExtent(FeatureB.getGeometry().getExtent())) {
                intersectingFeatures.push({
                    Feature: FeatureA,
                    layerIndex: Layer_num
                });
                break;
            }
        }
    }
}

//显示搜索结果
function search_result_show() {
    document.getElementById('rightsidebar').style.display = '';
    document.getElementById('rightsidebar_head').innerHTML = '<b>搜索结果</b>';
    document.getElementById('rightsidebar_content_1').style.height = '100%';

    var search_result;
    //建立表格
    if (intersectingFeatures.length == 0) {
        search_result = '<br /><p style="text-align:center;">Nothing Find</p>';
    }
    else {
        search_result = '<br /><table><thead><tr><th style="width:25%;">序号</th><th style="width:75%;">所属图层</th></tr></thead><tbody>';
        for (i = 0; i < intersectingFeatures.length; i++) {
            //所属图层名称
            var search_range = document.getElementById('search_range').value;
            var layer_value, layer_name;
            if (search_range == 'all') {
                layer_value = display1_element[intersectingFeatures[i].layerIndex][0];
                layer_name = display1_element[intersectingFeatures[i].layerIndex][6];
            } else {
                layer_value = OverLayers_name[intersectingFeatures[i].layerIndex][0];
                layer_name = OverLayers_name[intersectingFeatures[i].layerIndex][2];
            }

            search_result = search_result + '<tr onclick="search_result_detail_show(' + i + ', \'' + layer_value + '\')"><td style="text-align:center;">' + (i + 1) + '</td><td>' + layer_name + '</td></tr>';
        }
        search_result = search_result + '</tbody></table><br />';
    }
    document.getElementById('rightsidebar_content_1').innerHTML = search_result;

    $('table tr').click(function () {
        $(this).addClass('highlight').siblings().removeClass('highlight');
    });
}

//显示结果某行要素的详细信息
function search_result_detail_show(i, layer_value) {
    //移除图层
    map.removeLayer(intersectingLayer);

    //绘制该要素
    var source = new ol.source.Vector();
    intersectingLayer = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#00FFFF',
                width: 4
            }),
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: '#00FFFF'
                })
            })
        })
    });
    var feature = intersectingFeatures[i].Feature;
    source.addFeature(feature);
    map.addLayer(intersectingLayer);

    //显示要素的详细信息
    document.getElementById('rightsidebar_content_1').style.height = '30%';
    document.getElementById('rightsidebar_content_2').style.height = '68%';
    var text = display1Popup_click_text('display1_' + layer_value, feature);
    document.getElementById('rightsidebar_content_2').innerHTML = text[1];
}
/*** Search END ***/