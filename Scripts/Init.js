//const { registerMap } = require("echarts/lib/echarts");

//地图对象
var map;
//图层
var OverLayers = new Array();  //要素图层
var OverLayers_name = new Array();  //存有要素的value、type（点/线/面）、label、color
var OverLayers_num = 0;  //要素图层的数量
var OverLayers_tif_data = new Array();  //栅格数据
var OverLayers_tif_num = 0;  //栅格个数
var ClickLayer;
//popup元素
var container;
var PopopOverlay;
var popupElement;
var popupClose;
//鼠标位置控件
var mousePositionControl;
//鼠标选中的前一要素
//var preFeature = null;
//图层组
//var LayerArr;
//矢量、影像、地形图层
//var vecLayer, imgLayer, terLayer;
//注记图层
//var vecZjLayer, imgZjLayer, terZjLayer;
//窗口折叠
var fold_if = 0;
var unit_if = 0;

$(function () {
    //左窗口初始化
    //$("#leftfold").css("background-image", "url(Libs/images/left/LeftFold.png)");
    $("#leftfold").click(function () {
        if (fold_if == 0) {
            //窗口折叠
            //$(".leftsidebar_box").hide("slide", {direction:"left", percent:10}, 1000);
            $(".leftsidebar_box").css("overflow-y", "hidden");
            $(".leftsidebar_box").animate({ left: "-90%" }, 1000);
            $("#leftfold").animate({ rotate: '180deg' }, 1000, function () {
                $("#leftcontent").css("display", "none");
            });
            fold_if = 1;
        } else if (fold_if == 1) {
            //窗口展开
            //$(".leftsidebar_box").show("slide", {direction:"right"}, 1000);
            $("#leftcontent").css("display", "");
            $(".leftsidebar_box").animate({ left: "0" }, 1000);
            $("#leftfold").animate({ rotate: '0deg' }, 1000, function () {
                $(".leftsidebar_box").css("overflow-y", "scroll");
            });
            fold_if = 0;
        }
        
    })

    /**系统默认显示第一行菜单**/
    $("#display0").parent().find('li').show(); // 默认显示第一行菜单
    $("#display0_span").css("background-image", "url(Libs/images/left/MinusSign_.png)");

    /**菜单项单击事件**/
    $(".display_first").click(function () {
        //$(this).next().toggle();
        if ($(this).next().is(":hidden")) {
            $(this).next().slideToggle(); //滑动方式展开子菜单
            $(this).css("background-image", "url(Libs/images/left/MinusSign_.png)");
        }
        else {
            $(this).next().slideUp(); //滑动方式隐藏子菜单
            $(this).css("background-image", "url(Libs/images/left/AddSign_.png)");
        }
    });
    $(".display_second").click(function () {
        if ($(this).next().is(":hidden")) {
            $(this).next().slideToggle(); //滑动方式展开子菜单
        }
        else {
            $(this).next().slideUp(); //滑动方式隐藏子菜单
        }
    });
    $("#display0_ul li").click(function () {
        //改变其他按钮的样式(未选中状态)
        $(this).parent().parent().find("li").css("color", "");
        $(this).parent().parent().find("li").css("font-weight", "");
        $(this).parent().parent().find("li").css("font-size", "");
        //改变当前按钮的样式(选中状态)
        $(this).css("color", "#FFFFE0");
        $(this).css("font-size", "16px");
        $(this).css("font-weight", "bold");
    });

})

function init() {
    //坐标变换为 ESRI:104903
    var proj104903 = new ol.proj.Projection({
        code: 'ESRI:104903',
        extent: [-400, 400, -310, 580],
        units: 'm',
        axisOrientation: 'neu'
    });
    proj4.defs("ESRI:104903", "+proj=longlat +datum=WGS84 +no_defs +type=crs");
    ol.proj.proj4.register(proj4);
    ol.proj.addProjection(proj104903);
    //实例化鼠标位置控件（MousePosition）
    mousePositionControl = new ol.control.MousePosition({
        //坐标格式
        //coordinateFormat: ol.coordinate.createStringXY(4),
        coordinateFormat: customFormat_03,
        //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
        projection: proj104903,
        //坐标信息显示样式，默认是'ol-mouse-position'
        className: 'custom-mouse-position',
        //显示鼠标位置信息的目标容器
        target: document.getElementById('mouse-position'),
        //未定义坐标的标记
        undefinedHTML: '&nbsp;'
    });
    //地图中心点
    var center = [-40, 0];
    //center.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
    //对应源代码中的投影
    var projection = proj104903;
    var projectionExtent = projection.getExtent();
    //对应源代码中的切片方案信息（切片中的比例）
    //var resolutions = [16933.367200067736, 8466.683600033868, 4233.341800016934, 2116.670900008467, 1058.3354500042335, 529.1677250021168, 264.5838625010584, 132.2919312505292, 66.1459656252646]; //jp2
    //var resolutions = [66145.9656252646, 33072.9828126323, 16536.49140631615, 8268.245703158074, 4134.122851579037, 2067.0614257895186, 1033.5307128947593, 516.7653564473796]; //mercator tif
    var resolutions = [0.5948652514575701, 0.29743262572878504, 0.14871631286439252, 0.07435815643219626, 0.03717907821609813, 0.018589539108049065, 0.009294769554024532, 0.004647384777012266, 0.002323692388506133]; //tif
    var tileGrid = new ol.tilegrid.TileGrid({
        tileSize: [256, 256],
        //origin: origin,
        origin: ol.extent.getBottomLeft(projectionExtent),
        //extent: fullExtent,
        resolutions: resolutions
    });
    //创建地图对象
    map = new ol.Map({
        //目标DIV
        target: 'map',
        //loadTilesWhileAnimating: true,  //动画
        view: new ol.View({
            //投影坐标系
            projection: proj104903,
            //center: lonLat2Mercator(center),
            center: center,
            maxZoom: 20,
            minZoom: -2,
            zoom: 1
        }),
        //加载控件到地图容器中
        controls: ol.control.defaults({//地图中默认控件
            //attributionOptions: /** @type {ol.control.Attribution} */({
                //collapsible: true //地图数据源信息控件是否可展开,默认为true
            //})
        }).extend([mousePositionControl])  //加载鼠标位置控件
    });

    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            tileGrid: tileGrid,
            projection: proj104903,
            tileUrlFunction: function (coordinate) {
                //alert(coordinate[0] + " X= " + coordinate[1] + " Y= " + coordinate[2]);
                var x = 'C' + zeroFill(coordinate[1], 8, 16);
                var y = 'R' + zeroFill(-coordinate[2] - 1, 8, 16);
                var z = 'L' + zeroFill(coordinate[0], 2, 10);
                //return '_alllayers/' + z + '/' + y + '/' + x + '.png';//这里可以修改地图路径
                return 'Layers/layer_0915/_alllayers/' + z + '/' + y + '/' + x + '.png';//这里可以修改地图路径
            }
        })
    });
    map.addLayer(tileLayer);

    PopopShow();

    /*
    var arcGISSource = new ol.source.TileArcGISRest({
        //ArcGIS Rest服务url,url中包括MapServer或ImageServer
        url: 'http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' + 'Specialty/ESRI_StateCityHighway_USA/MapServer'
    });
    var arcGISLayers = new ol.layer.Tile({
        source: arcGISSource,
        extent: [-13884991, 2870341, -7455066, 6338219]
    });
    //添加瓦片地图图层
    map.addLayer(arcGISLayers);
    */

    /*
    var coordinate = new ol.geom.Point([300, -500]);
    coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'ESRI:104903'));
    var feature = new ol.Feature({
        geometry: coordinate
    });
    vectorLayerViewPoint.getSource().addFeature(feature);
    */

    //通过拖拽调整位置
    var div1 = document.getElementById('rightsidebar_content_1');
    var div2 = document.getElementById('rightsidebar_content_2');
    var dragbar = document.getElementById('dragbar');

    dragbar.onmousedown = function (e) {
        document.onmousemove = function (e) {
            var top = e.clientY;
            var newHeight = top - div1.offsetTop - 115;
            if (newHeight < 0) {
                newHeight = 0;
            }
            div1.style.height = newHeight + 'px';
            div2.style.top = (top + dragbar.offsetHeight - 115) + 'px';
        }
    }
    document.onmouseup = function (e) {
        document.onmousemove = null;
    }
}

//添加弹窗
function PopopShow() {
    //获取popup的容器
    container = document.getElementById('popup');
    //在地图容器中创建一个Overlay
    PopopOverlay = new ol.Overlay(({
        element: container,
        stopEvent: false,  // 允许鼠标事件穿透到地图
        autoPan: true
    }));
    map.addOverlay(PopopOverlay);

    popupClose = $("#popup-closer");
    /**
    * 添加关闭按钮的单击事件（隐藏popup）
    * @return {boolean} Don't follow the href.
    */
    popupClose.bind("click", function () {
        PopopOverlay.setPosition(undefined);  //未定义popup位置
        popupClose.blur(); //失去焦点

    });
    //鼠标点击
    var click_source = new ol.source.Vector();
    ClickLayer = new ol.layer.Vector({
        source: click_source,
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
    //map.addLayer(ClickLayer);
    map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate;
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        map.removeLayer(ClickLayer);
        if (feature) {
            //document.getElementById('popup').style.display = "";
            ClickLayer.getSource().clear();
            click_source.addFeature(feature);
            map.addLayer(ClickLayer);
            var clicktype = feature.get('type');
            if (clicktype) {
                if (clicktype.substring(0, 8) == "display1") {
                    display1Popup_click(clicktype, feature);
                    //PopopOverlay.setPosition(coordinate);
                }
                else {
                    return;
                }
            }
        }
    });
    //鼠标悬停
    map.on('pointermove', function (evt) {
        var pixel = map.getEventPixel(evt.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
        var coordinate = evt.coordinate;
        //判断当前鼠标悬停位置处是否有要素，捕获到要素时设置图标样式
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        if (feature) {
            document.getElementById('popup').style.display = "";
            var movetype = feature.get('type');
            /*if (movetype == 'unit') {
                //var value = feature.get('values_');
                unitPopup(feature);
                PopopOverlay.setPosition(coordinate);
            }*/
            if (movetype) {
                if (movetype.substring(0, 8) == "display1") {
                    display1Popup_move(movetype, feature);
                    PopopOverlay.setPosition(coordinate);
                }
            }

        } else {
            document.getElementById('popup').style.display = "none";
        }
    });
}

//给8位字符串文件名补0
function zeroFill(num, len, radix) {
    var str = num.toString(radix || 10);
    while (str.length < len) {
        str = "0" + str;
    }
    return str;
}

/**
* 判断是否为低版本ie浏览器
* @author zjh 2018-08-23
*/
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

/**
* WGS-84 转 web墨卡托，主要用于将坐标单位为度的值转为单位为米的值
* @param {double} lon 经度
* @param {double} lat 纬度
* @author zjh 2018-08-23
*/
function lonLat2Mercator(lonlat) {
    let x = (lonlat[0] * 20037508.34) / 180
    let y = Math.log(Math.tan(((90 + lonlat[1]) * Math.PI) / 360)) / (Math.PI / 180)
    y = (y * 20037508.34) / 180
    return [x, y];
}

/**
* web墨卡托 转 WGS-84，主要用于将坐标单位为米的值转为单位为度的值
* @param {double} mercatorX X坐标
* @param {double} mercatorY Y坐标
* @author zjh 2018-08-23
*/
function mercator2LonLat(mercatorX, mercatorY) {
    var lon = mercatorX * 180 / 20037508.34;
    var lat = 180 / Math.PI * (2 * Math.atan(Math.exp((mercatorY / 20037508.34) * Math.PI)) - Math.PI / 2);
    return { 'x': lon, 'y': lat };
}

//rgba转为16进制颜色+透明度
function rgbaToHex(rgba) {
    var parts = rgba.substring(rgba.indexOf("(")).split(","),
        r = parseInt(parts[0].substring(1), 10),
        g = parseInt(parts[1], 10),
        b = parseInt(parts[2], 10),
        a = parseFloat(parts[3]);

    var hexColor = "#" + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
    var opacity = a.toFixed(2);

    return [hexColor, opacity];
}
//16进制颜色+透明度转为rgba
function hexToRgba(hexColor, opacity) {
    var r = parseInt(hexColor.slice(1, 3), 16),
        g = parseInt(hexColor.slice(3, 5), 16),
        b = parseInt(hexColor.slice(5, 7), 16);

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity + ')';

}

// 显示加载动画
function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}
// 隐藏加载动画
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

/*
* 根据基地址创建天地图图层
* @param {string} baseurl 天地图图层基地址
* @author zjh 2019-01-16
*/
/*
function CreteTDTLayer(baseurl) {
    //初始化天地图矢量图层
    var layer = new ol.layer.Tile({
        //设置图层透明度
        opacity: 1,
        //数据源
        source: new ol.source.XYZ({
            url: baseurl,
            //projection: projection,
            //imageExtent:extent
        })
    })
    //返回layer
    return layer;
}
*/

/*
* 加载天地图图层
* @author zjh 2019-01-16
*/
/*
function addBaseLayer() {
    //矢量图层
    vecLayer = CreteTDTLayer("MapOfMoon/WAC_m_00.png");
    //影像图层
    //imgLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //地形图层
    //terLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //矢量注记图层
    //vecZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //影像注记图层
    //imgZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //地形注记图层
    //terZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //图层组
    LayerArr = [vecLayer, imgLayer, terLayer, vecZjLayer, imgZjLayer, terZjLayer];
}
*/