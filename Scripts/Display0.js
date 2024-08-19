var proj104903;
var proj103877;
var proj103878;
var proj103879;
var proj103880;
var po_now = 'ESRI:104903', po_pre;  //当前、先前坐标系
var display1_show = 'content';
var display1_element = [
    ['ANTHROPOGENIC_OBJECTS_180', 1, 1, 0, 1, 1, '人类活动地点'],
    ['CONTROLLED_MOSAICS_180', 1, 1, 1, 1, 1, '控制性镶嵌图像产品'],
    ['COPERNICAN_CRATERS_180', 1, 1, 1, 1, 1, '哥白尼纪撞击坑'],
    ['CX_TARGETS_180', 1, 1, 1, 1, 1, '星座计划候选着陆点'],
    ['FEATURED_MOSAICS_180', 1, 1, 1, 1, 1, '特色镶嵌图像产品'],
    ['HIESINGER2011_MARE_AGE_UNITS_180', 1, 1, 1, 1, 1, '汇编月海单元'],
    ['HIESINGER2011_MARE_CRATER_COUNT_AREAS_180', 1, 1, 1, 1, 1, '撞击坑统计单元'],
    ['LOBATE_SCARPS_180', 1, 0, 0, 1, 1, '叶状陡坎'],
    ['LROC_5TO20KM_CRATERS_180', 1, 1, 1, 1, 1, '全月表撞击坑（直径5-20km）'],
    ['LROC_GLOBAL_MARE_180', 1, 1, 1, 1, 1, '全月月海'],
    ['LUNAR_IMP_LOCATIONS_180', 1, 0, 0, 1, 0, '不规则月海斑块'],
    ['LUNAR_PIT_LOCATIONS_180', 1, 1, 1, 1, 1, '熔岩管洞穴'],
    ['LUNAR_SWIRLS_180', 1, 0, 0, 1, 1, '漩涡'],
    ['NAC_DTMS_180', 1, 1, 1, 1, 1, '数字高程模型覆盖区'],
    ['NAC_PHO_SITES_180', 1, 0, 0, 1, 1, '光度序列图像位置'],
    ['POLAR_SCARP_LOCATIONS_180', 1, 1, 1, 1, 1, '极区叶状陡坎'],
    ['STEREO_OBSERVATIONS_180', 1, 1, 1, 1, 1, '立体观测区域'],
    ['WRINKLE_RIDGES_180', 1, 1, 1, 1, 1, '皱脊'],
    ['月海玄武岩', 1, 1, 1, 1, 1, '全月月海玄武岩单元划分'],
    ['MOON_nomenclature_center_pts_180', 1, 1, 1, 1, 1, '已命名撞击坑'],
    ['Head_2010_LolaLargeLunarCraterCatalog_poly', 1, 1, 1, 1, 1, '>20km大撞击坑'],
    ['Povilaitis_2018_LROC_5TO20KM_CRATERS_180_PTS', 1, 1, 1, 1, 1, '5-20km撞击坑'],
    ['Robbins_2019_lon_180_lat_diam_a_b_ecc_ell_ang', 1, 1, 1, 1, 1, '>1km撞击坑（Robbins）'],
    ['Guo_2018_full_secondaries', 1, 1, 1, 1, 1, '东海二次坑（Guo）'],
    ['Qian_CE5_Craters_4145N4969W', 1, 0, 0, 1, 0, 'CE5着陆区撞击坑'],
    ['Ohman_2015_crater', 1, 1, 1, 1, 1, '撞击坑（Ohman）'],
    ['LU1319373_Wang_Wu_2021', 1, 1, 1, 1, 1, '>1km撞击坑（Wang）'],
    ['Salamuniccar_2014_LU78287GT_Moon2000', 1, 1, 1, 1, 1, '撞击坑（Salamunićcar）'],
    ['Singer_2020_Copernicus', 1, 0, 0, 1, 0, '哥白尼二次坑'],
    ['Singer_2020_Kepler', 1, 0, 0, 1, 0, '开普勒二次坑'],
    ['Singer_2020_Orientale', 1, 0, 0, 1, 1, '东海二次坑（Singer）'],
    ['Wu_2019_3k_up', 1, 0, 0, 1, 1, '东海二次坑（Wu）'],
    ['Yang_crater', 1, 1, 1, 1, 1, '撞击坑（Yang）'],
    ['Yue_2022_CRATER_ce5_crater_combine', 1, 0, 0, 1, 0, 'CE5着陆区撞击坑（Yue）'],
    ['Simple_mare_merge_Polyline', 1, 0, 0, 1, 1, '简单撞击坑-月海'],
    ['Simple_highland_merge_Polyline', 1, 0, 0, 1, 1, '简单撞击坑-高地'],
    ['Intermediate_mare_craterrim_merge_line', 1, 0, 0, 1, 1, '过渡型撞击坑-月海'],
    ['Intermediate_highland_craterrim_merge_line', 1, 0, 0, 1, 1, '过渡型撞击坑-高地'],
    ['Complex_mare_rim_erasefloor', 1, 0, 0, 1, 1, '复杂撞击坑坑壁-月海'],
    ['Complex_mare_floor_erasePeak', 1, 0, 0, 1, 1, '复杂撞击坑坑底-月海'],
    ['Complex_highland_rim_erasefloor', 1, 0, 0, 1, 1, '复杂撞击坑坑壁-高地'],
    ['Complex_highland_floor_erasePeak', 1, 0, 0, 1, 1, '复杂撞击坑坑底-高地'],
    ['grid_age_craterstats3', 1, 1, 1, 1, 1, '栅格年龄图'],
    ['grid_age_refined_craterstats3', 1, 1, 1, 1, 1, '栅格年龄图（修）'],
    ['CR_moon', 1, 1, 1, 1, 1, '成坑速率空间校正系数'],
    ['Iron_Hd_Cyl', 1, 1, 1, 1, 1, '铁含量'],
    ['Thorium_Hd_Cyl', 1, 1, 1, 1, 1, '钍含量'],
    ['IIM_global_mosaic_20140326_new_geo_10X10_geo_cont_IBD_2b', 1, 1, 1, 1, 1, '镁含量'],
    ['WAC_TIO2_GCS_MB_NAN_HD', 1, 1, 1, 1, 1, '二氧化钛含量']
];  //各个要素在各个投影下是否存在

//切换底图
function projection_cha(a) {
    //图层中是否有该要素
    if (display1_show == 'content') {
        ele_display_if_content(a);
    } else {
        ele_display_if_layer(a);
    }
    
    //要素的投影转换
    if (a == 1) {
        map_pro_cha(104903);
    } else if (a == 2) {
        map_pro_cha(103877);
    } else if (a == 3) {
        map_pro_cha(103878);
    } else if (a == 4) {
        map_pro_cha(103880);
    } else if (a == 5) {
        map_pro_cha(103879);
    }
}

//checkbox是否允许选中
function ele_display_if_content(a) {
    var display1_layers = document.getElementsByName('display1_layers');

    for (var i = 0; i < display1_layers.length; i++) {
        display1_layers[i].classList.remove('disabled');
        display1_layers[i].disabled = false;

        for (var j = 0; j < display1_element.length; j++) {
            if ((display1_layers[i].value == display1_element[j][0]) && display1_element[j][a] == 0) {
                display1_layers[i].classList.add('disabled');
                display1_layers[i].disabled = true;
            }
        }
    }
}
function ele_display_if_layer(a) {
    var display1_layers = document.getElementsByName('display1_layers_2');

    for (var i = 0; i < display1_layers.length; i++) {
        display1_layers[i].classList.remove('disabled');
        display1_layers[i].disabled = false;

        for (var j = 0; j < display1_element.length; j++) {
            if ((display1_layers[i].value == display1_element[j][0]) && display1_element[j][a] == 0) {
                display1_layers[i].classList.add('disabled');
                display1_layers[i].disabled = true;
            }
        }
    }
}

//切换底图函数
function map_pro_cha(proj_num) {
    //对应源代码中的切片方案信息（切片中的比例）
    var resolutions;
    //坐标系
    var projection;
    //坐标中心
    var center;
    //初始大小
    var zoom;
    //切片所在文件夹
    var layer;

    //清空地图
    map.dispose();  //移去底图+所有图层

    //重新添加popup
    var popup_div = '<div id="popup" class="ol-popup"><div id="popup-closer" class="ol-popup-closer"></div><div id="popup-content"></div></div>';
    $("#map").append(popup_div);

    //坐标系定义
    proj104903 = new ol.proj.Projection({
        code: 'ESRI:104903',
        extent: [-400, 400, -310, 580],
        units: 'm',
        axisOrientation: 'neu'
    });
    proj4.defs("ESRI:104903", "+proj=longlat +datum=WGS84 +no_defs +type=crs");
    ol.proj.proj4.register(proj4);
    ol.proj.addProjection(proj104903);

    proj103877 = new ol.proj.Projection({
        code: 'ESRI:103877',
        //extent: [-90 - 8389010 * 4 + 4749155, -90 + 8389190 * 4 - 4749655, 90 - 8389010 * 4 + 4749655, 90 + 8389190 * 4 - 4749655],
        extent: [-90 - 8389010, -90 + 8389190, 90 - 8389010, 90 + 8389190],
        //extent: [-90, -90, 90, 90],
        units: 'm',
        axisOrientation: 'neu'
    });
    proj4.defs("ESRI:103877", "+proj=stere +lat_0=90 +lon_0=0 +k=1 +x_0=0 +y_0=0 +R=1737400 +units=m +no_defs +type=crs");
    ol.proj.proj4.register(proj4);
    ol.proj.addProjection(proj103877);

    proj103878 = new ol.proj.Projection({
        code: 'ESRI:103878',
        extent: [-90 - 8389010, -90 + 8389190, 90 - 8389010, 90 + 8389190],
        units: 'm',
        axisOrientation: 'neu'
    });
    proj4.defs("ESRI:103878", "+proj=stere +lat_0=-90 +lon_0=0 +k=1 +x_0=0 +y_0=0 +R=1737400 +units=m +no_defs +type=crs");
    ol.proj.proj4.register(proj4);
    ol.proj.addProjection(proj103878);

    proj103880 = new ol.proj.Projection({
        code: 'ESRI:103880',
        //extent: [-90, -90, 90, 90],
        extent: [-90 - 1737400, -90 + 1737400, 90 - 1737400, 90 + 1737400],
        //extent: [-90 - 1737400 * 4 + 571505, -90 + 1737400 * 4 - 571505, 90 - 1737400 * 4 + 571505, 90 - 1737400 * 4 - 571505],
        units: 'm',
        axisOrientation: 'neu'
    });
    proj4.defs("ESRI:103880", "+proj=laea +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R=1737400 +units=m +no_defs +type=crs");
    ol.proj.proj4.register(proj4);
    ol.proj.addProjection(proj103880);

    proj103879 = new ol.proj.Projection({
        code: 'ESRI:103879',
        extent: [-90 - 1737400, -90 + 1737400, 90 - 1737400, 90 + 1737400],
        units: 'm',
        axisOrientation: 'neu'
    });
    proj4.defs("ESRI:103879", "+proj=laea +lat_0=0 +lon_0=180 +x_0=0 +y_0=0 +R=1737400 +units=m +no_defs +type=crs");
    ol.proj.proj4.register(proj4);
    ol.proj.addProjection(proj103879);

    //变换坐标系
    if (proj_num == 104903) {
        //坐标变换为 ESRI:104903 (Moon 2000 Equidistant Cylindrial)
        po_pre = po_now;
        po_now = 'ESRI:104903';
        //坐标系设置
        projection = proj104903;
        //比例设置
        resolutions = [0.5948652514575701, 0.29743262572878504, 0.14871631286439252, 0.07435815643219626, 0.03717907821609813, 0.018589539108049065, 0.009294769554024532, 0.004647384777012266, 0.002323692388506133]; //tif
        //中心设置
        center = [-40, 0];
        //初始大小设置
        zoom = 1;
        //文件夹
        layer = "Layers/layer_0915";
        //实例化鼠标位置控件（MousePosition）
        mousePositionControl = new ol.control.MousePosition({
            //坐标格式
            //coordinateFormat: ol.coordinate.createStringXY(4), 
            coordinateFormat: customFormat_03,
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: projection,
            //坐标信息显示样式，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        });

    }
    else if (proj_num == 3857) {
        //坐标变换为 EPSG:3857 (Mercator)
        projection = ol.proj.get('EPSG:3857');
        //中心设置
        center = [0, 0];
        //center.applyTransform(ol.proj.getTransform('ESRI:104903', 'EPSG:3857'));
        center = lonLat2Mercator(center);
        //文件夹
        layer = "Layers/layer_mor_0914";

    }  //这个用不上（墨卡托）
    else if (proj_num == 103877) {
        //坐标变换为 ESRI:103877 (Moon 2000 North Pole Stereographic)
        po_pre = po_now;
        po_now = 'ESRI:103877';
        //坐标系设置
        projection = proj103877;
        //比例设置
        //resolutions = [17374 * 0.5948652514575701, 17374 * 0.29743262572878504, 17374 * 0.14871631286439252, 17374 * 0.07435815643219626, 17374 * 0.03717907821609813, 17374 * 0.018589539108049065, 17374 * 0.009294769554024532, 17374 * 0.004647384777012266, 17374 *0.002323692388506133]; //tif
        //resolutions = [132291.931250529 ,66145.9656252646, 33072.9828126323, 16536.49140631615, 8268.245703158074, 4134.122851579037, 2067.0614257895186, 1033.5307128947593, 516.7653564473796, 258.3826782236898, 129.1913391118449, 64.59566955592246]; //mercator tif
        resolutions = [4134.122851579037, 2067.0614257895186, 1033.5307128947593, 516.7653564473796, 258.3826782236898, 129.1913391118449, 64.59566955592246, 64.59566955592246 / 2, 64.59566955592246 / 4]; //mercator tif
        //resolutions = [3857.25, 3857.25 / 2, 3857.25 / 4, 3857.25 / 8, 3857.25 / 16, 3857.25 / 32, 3857.25 / 64, 3857.25 / 128, 3857.25 / 256];  //60度极射投影
        //resolutions = [14196, 14195 / 2, 14196 / 4, 14196 / 8, 14196 / 16, 14196 / 32, 14196 / 64, 14196 / 128, 14196 / 256];  //1984
        //中心设置
        center = [0, 0];
        //初始大小设置
        zoom = -12;
        //文件夹
        layer = "Layers/layer_north_0917";
        //实例化鼠标位置控件（MousePosition）
        mousePositionControl = new ol.control.MousePosition({
            //坐标格式
            coordinateFormat: customFormat_77,
            //coordinateFormat: ol.coordinate.createStringXY(4),
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: projection,
            //坐标信息显示样式，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        });

    }
    else if (proj_num == 103878) {
        //坐标变换为 ESRI:103878 (Moon 2000 South Pole Stereographic)
        po_pre = po_now;
        po_now = 'ESRI:103878';
        //坐标系设置
        projection = proj103878;
        //比例设置
        resolutions = [4134.122851579037, 2067.0614257895186, 1033.5307128947593, 516.7653564473796, 258.3826782236898, 129.1913391118449, 64.59566955592246, 64.59566955592246 / 2, 64.59566955592246 / 4];
        //中心设置
        center = [0, 0];
        //初始大小设置
        zoom = -12;
        //文件夹
        layer = "Layers/layer_south_0917";
        //实例化鼠标位置控件（MousePosition）
        mousePositionControl = new ol.control.MousePosition({
            //坐标格式
            coordinateFormat: customFormat_78,
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: projection,
            //坐标信息显示样式，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        });

    }
    else if (proj_num == 103880) {
        //坐标变换为 ESRI:103880 (Moon 2000 Near Side Lambert Azimuthal Equal Area)
        po_pre = po_now;
        po_now = 'ESRI:103880';
        //坐标系设置
        projection = proj103880;
        //比例设置
        //resolutions = [0.5948652514575701 * 18 / 25, 0.29743262572878504 * 18 / 25, 0.14871631286439252 * 18 / 25, 0.07435815643219626 * 18 / 25, 0.03717907821609813 * 18 / 25, 0.018589539108049065 * 18 / 25, 0.009294769554024532 * 18 / 25, 0.004647384777012266 * 18 / 25, 0.002323692388506133 * 18 / 25]; //tif
        //resolutions = [132291.931250529 ,66145.9656252646, 33072.9828126323, 16536.49140631615, 8268.245703158074, 4134.122851579037, 2067.0614257895186, 1033.5307128947593, 516.7653564473796, 258.3826782236898, 129.1913391118449, 64.59566955592246]; //mercator tif
        resolutions = [8268.245703158074, 4134.122851579037, 2067.0614257895186, 1033.5307128947593, 516.7653564473796, 258.3826782236898, 129.1913391118449, 64.59566955592246, 64.59566955592246 / 2]; //mercator tif
        //resolutions = [30352, 30352 / 2, 30352 / 4, 30352 / 8, 30352 / 16, 30352 / 32, 30352 / 64, 30352 / 128, 30352 / 256];
        //中心设置
        center = [0, 0];
        //center = [3474800, -3474800];
        //初始大小设置
        zoom = -13;
        //文件夹
        layer = "Layers/layer_near_0917";
        //实例化鼠标位置控件（MousePosition）
        mousePositionControl = new ol.control.MousePosition({
            //坐标格式
            coordinateFormat: customFormat_80,
            //coordinateFormat: ol.coordinate.createStringXY(4),
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: projection,
            //坐标信息显示样式，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        });

    }
    else if (proj_num == 103879) {
        //坐标变换为 ESRI:103879 (Moon 2000 Far Side Lambert Azimuthal Equal Area)
        po_pre = po_now;
        po_now = 'ESRI:103879';
        //坐标系设置
        projection = proj103879;
        //比例设置
        resolutions = [8268.245703158074, 4134.122851579037, 2067.0614257895186, 1033.5307128947593, 516.7653564473796, 258.3826782236898, 129.1913391118449, 64.59566955592246, 64.59566955592246 / 2];
        //中心设置
        center = [0, 0];
        //初始大小设置
        zoom = -13;
        //文件夹
        layer = "Layers/layer_far_0917";
        //实例化鼠标位置控件（MousePosition）
        mousePositionControl = new ol.control.MousePosition({
            //坐标格式
            coordinateFormat: customFormat_79,
            //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
            projection: projection,
            //坐标信息显示样式，默认是'ol-mouse-position'
            className: 'custom-mouse-position',
            //显示鼠标位置信息的目标容器
            target: document.getElementById('mouse-position'),
            //未定义坐标的标记
            undefinedHTML: '&nbsp;'
        });

    }

    //对应源代码中的投影
    var projectionExtent = projection.getExtent();
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
            projection: projection,
            //center: lonLat2Mercator(center),
            center: center,
            maxZoom: 20,
            minZoom: -20,
            zoom: zoom
        }),
        //加载控件到地图容器中
        controls: ol.control.defaults({}).extend([mousePositionControl])//加载鼠标位置控件
    });

    // ol.source.XYZ添加瓦片地图的层
    var tileLayer = new ol.layer.Tile({
        source: new ol.source.XYZ({
            tileGrid: tileGrid,
            projection: projection,
            tileUrlFunction: function (coordinate) {
                //alert(coordinate[0] + " X= " + coordinate[1] + " Y= " + coordinate[2]);
                var x = 'C' + zeroFill(coordinate[1], 8, 16);
                var y = 'R' + zeroFill(-coordinate[2] - 1, 8, 16);
                var z = 'L' + zeroFill(coordinate[0], 2, 10);
                //return '_alllayers/' + z + '/' + y + '/' + x + '.png';//这里可以修改地图路径
                return layer + '/_alllayers/' + z + '/' + y + '/' + x + '.png';//这里可以修改地图路径
            }
        })
    });
    map.addLayer(tileLayer);

    //图层坐标系变换
    if (po_pre != po_now) {
        OverLayers_reset();
    }

    //展示弹窗
    PopopShow();
}

// 图层坐标系变换
function OverLayers_reset() {
    for (var i = 0; i < OverLayers_num; i++) {
        var color;
        if (OverLayers_name[i][1] == 'tif') {
            map.removeLayer(OverLayers[i]);
            color = add_overlayers_tif(i, OverLayers_name[i][3]);
        } else {
            if (OverLayers_name[i][1] == 'point') {
                color = OverLayers[i].getStyle().getImage().getFill().getColor();
            } else if (OverLayers_name[i][1] == 'line') {
                color = OverLayers[i].getStyle().getStroke().getColor();
            } else if (OverLayers_name[i][1] == 'area') {
                color = new Array();
                color[0] = OverLayers[i].getStyle().getStroke().getColor();
                color[1] = OverLayers[i].getStyle().getFill().getColor();
            }
            map.removeLayer(OverLayers[i]);
            color = add_overlayers(i, color); //添加图层，并返回颜色
        }
    }
}

//鼠标控件更改
function customFormat_03(coordinate) {
    var x = coordinate[0], y = coordinate[1];
    if (x > 0 & y > 0) {
        a = formatDegree(x) + '东';
        b = formatDegree(y) + '北';
    } else if (x < 0 & y > 0) {
        a = formatDegree(x) + '西';
        b = formatDegree(y) + '北';
    } else if (x > 0 & y < 0) {
        a = formatDegree(x) + '东';
        b = formatDegree(y) + '南';
    } else if (x < 0 & y < 0) {
        a = formatDegree(x) + '西';
        b = formatDegree(y) + '南';
    } else {
        return '';
    }

    return a + '，' + b;
}
function customFormat_77(coordinate) {      //ESRI:103877
    var R = 1737400;
    //var R = 5965864.512;
    var x = coordinate[0], y = coordinate[1];
    var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var r = -2 * Math.atan(d / 2 / R) * 180 / Math.PI + 90;
    var theta;
    if (x == 0 & y >= 0) {
        theta = 180;
    } else if (x == 0 & y < 0) {
        theta = 0;
    } else if (x > 0) {
        theta = Math.atan(y / x) * 180 / Math.PI + 90;
    } else if (x < 0) {
        theta = Math.atan(y / x) * 180 / Math.PI - 90;
    }
    //var x = coordinate[0] * 30 / 931106.3, y = coordinate[1] * 30 / 931106.3;
    //var r = 90 - Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    //var theta;
    if (r >= 0) {
        r = formatDegree(r) + '北';
    } else if (r < 0 & r >= -90) {
        r = formatDegree(r) + '南';
    } else {
        return '';
    }
    if (x > 0) {
        theta = formatDegree(Math.atan(y / x) * 180 / Math.PI + 90) + '东';
    } else if (x < 0) {
        theta = formatDegree(90 - Math.atan(y / x) * 180 / Math.PI) + '西';
    } else if (x == 0 & y > 0) {
        theta = formatDegree(180);
    } else if (x == 0 & y <= 0) {
        theta = formatDegree(0);
    }
    return theta + '，' + r;
}
function customFormat_78(coordinate) {      //ESRI:103878
    var R = 1737400;
    //var R = 5965864.512;
    var x = coordinate[0], y = coordinate[1];
    var d = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var r = 2 * Math.atan(d / 2 / R) * 180 / Math.PI - 90;
    var theta;
    if (x == 0 & y >= 0) {
        theta = 0;
    } else if (x == 0 & y < 0) {
        theta = -180;
    } else if (x > 0) {
        theta = Math.atan(-y / x) * 180 / Math.PI + 90;
    } else if (x < 0) {
        theta = Math.atan(-y / x) * 180 / Math.PI - 90;
    }
    //var x = coordinate[0] * 30 / 931106.3, y = coordinate[1] * 30 / 931106.3;
    //var r = 90 - Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    //var theta;
    if (r >= 0) {
        r = formatDegree(r) + '北';
    } else if (r < 0 & r >= -90) {
        r = formatDegree(r) + '南';
    } else {
        return '';
    }
    if (x > 0) {
        theta = formatDegree(90 - Math.atan(y / x) * 180 / Math.PI) + '东';
    } else if (x < 0) {
        theta = formatDegree(90 + Math.atan(y / x) * 180 / Math.PI) + '西';
    } else if (x == 0 & y > 0) {
        theta = formatDegree(0);
    } else if (x == 0 & y <= 0) {
        theta = formatDegree(180);
    }
    return theta + '，' + r;
}
function customFormat_80(coordinate) {      //ESRI:103880
    /*var x = coordinate[0] * 90 / 1737400, y = coordinate[1] * 90 / 1737400;
    var rho = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var c = 2 * Math.atan(rho / 90);
    var phi, lambda, a, b;
    phi = Math.asin(y * Math.sin(c) / rho) * 180 / Math.PI;
    lambda = Math.atan(x * Math.tan(c) / rho) * 180 / Math.PI;*/
    var R = 1737400;
    //var R = 6378135;
    var x = coordinate[0], y = coordinate[1];
    var phi = Math.asin(y / R) * 180 / Math.PI;
    var lambda = Math.asin(x / Math.sqrt(Math.pow(R, 2) - Math.pow(y, 2))) * 180 / Math.PI;
    var a, b;
    if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) >= R) {
        return '';
    } else if (x > 0 & y > 0) {
        a = formatDegree(lambda) + '东';
        b = formatDegree(phi) + '北';
    } else if (x < 0 & y > 0) {
        a = formatDegree(lambda) + '西';
        b = formatDegree(phi) + '北';
    } else if (x > 0 & y < 0) {
        a = formatDegree(lambda) + '东';
        b = formatDegree(phi) + '南';
    } else if (x < 0 & y < 0) {
        a = formatDegree(lambda) + '西';
        b = formatDegree(phi) + '南';
    }
    return a + '，' + b;
}
function customFormat_79(coordinate) {      //ESRI:103879
    /*var x = coordinate[0] * 90 / 1737400, y = coordinate[1] * 90 / 1737400;
    var rho = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var c = 2 * Math.atan(rho / 90);
    var phi, lambda, a, b;
    phi = Math.asin(y * Math.sin(c) / rho) * 180 / Math.PI;
    lambda = Math.atan(x * Math.tan(c) / rho) * 180 / Math.PI + 180;*/
    var R = 1737400;
    //var R = 6378135;
    var x = coordinate[0], y = coordinate[1];
    var R = 1737400;
    var phi = Math.asin(y / R) * 180 / Math.PI;
    var lambda = Math.asin(x / Math.sqrt(Math.pow(R, 2) - Math.pow(y, 2))) * 180 / Math.PI;
    var a, b;
    if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) >= R) {
        return '';
    } else if (x > 0 & y > 0) {
        a = formatDegree(180 - lambda) + '西';
        b = formatDegree(phi) + '北';
    } else if (x < 0 & y > 0) {
        a = formatDegree(180 + lambda) + '东';
        b = formatDegree(phi) + '北';
    } else if (x > 0 & y < 0) {
        a = formatDegree(180 - lambda) + '西';
        b = formatDegree(phi) + '南';
    } else if (x < 0 & y < 0) {
        a = formatDegree(180 + lambda) + '东';
        b = formatDegree(phi) + '南';
    }
    return a + '，' + b;
}

//小数转度分秒
function formatDegree(value) {
    // 将小数转换为绝对值
    value = Math.abs(value);
    // 取整数部分作为度
    var v1 = Math.floor(value);
    // 取小数部分乘以60作为分
    var v2 = Math.floor((value - v1) * 60);
    // 取小数部分乘以3600对60取余作为秒
    var v3 = Math.round((value - v1) * 3600 % 60);
    // 返回度分秒的字符串，用° ' "表示
    return v1 + '°' + v2 + '\'' + v3 + '\"';
}

//要素的坐标系转换（已经不用这个了）
function coordinate_transform(coordinates, pre_position, now_position, e) {
    //前后坐标系相同
    if (pre_position == now_position) {
        return coordinates;
    }
    var x0 = coordinates[0], y0 = coordinates[1]; //旧坐标
    var x, y; //新坐标
    //前后坐标系不同
    if (pre_position == 'ESRI:104903') {
        if (now_position == 'ESRI:103877') {
            //等距转北极射
            var R = 1737400;
            var d = 2 * R * Math.tan((90 - y0) / 2 * Math.PI / 180);
            x = d * Math.cos((x0 - 90) * Math.PI / 180);
            y = d * Math.sin((x0 - 90) * Math.PI / 180);
            return [x, y];

        } else if (now_position == 'ESRI:103878') {
            //等距转南极射
            var R = 1737400;
            var d = 2 * R * Math.tan((y0 + 90) / 2 * Math.PI / 180);
            x = d * Math.cos((x0 - 90) * Math.PI / 180);
            y = -d * Math.sin((x0 - 90) * Math.PI / 180);
            return [x, y];

        } else if (now_position == 'ESRI:103880') {
            //等距转正正射
            var R = 1737400;
            y = R * Math.sin(y0 * Math.PI / 180);
            if (x0 >= -90 & x0 <= 90) {
                x = R * Math.cos(y0 * Math.PI / 180) * Math.sin(x0 * Math.PI / 180);
            } else {
                x = -R * Math.cos(y0 * Math.PI / 180) * Math.sin(x0 * Math.PI / 180) + 2 * R;
            }
            return [x, y];

        } else if (now_position == 'ESRI:103879') {
            //等距转背正射
            var R = 1737400;
            y = R * Math.sin(y0 * Math.PI / 180);
            if (x0 <= -90 || x0 >= 90) {
                x = -R * Math.cos(y0 * Math.PI / 180) * Math.sin(x0 * Math.PI / 180);
            } else {
                x = R * Math.cos(y0 * Math.PI / 180) * Math.sin(x0 * Math.PI / 180) - 2 * R;
            }
            return [x, y];

        }
    } else if (pre_position == 'ESRI:103877') {
        if (now_position == 'ESRI:104903') {
            //北极射转等距
            var R = 1737400;
            var d = Math.sqrt(Math.pow(x0, 2) + Math.pow(y0, 2));
            y = -2 * Math.atan(d / 2 / R) * 180 / Math.PI + 90;
            if (x0 == 0 & y0 >= 0) {
                x = -180;
            } else if (x0 == 0 & y0 < 0) {
                x = 0;
            } else if (x0 > 0) {
                x = Math.atan(y0 / x0) * 180 / Math.PI + 90;
            } else if (x0 < 0) {
                x = Math.atan(y0 / x0) * 180 / Math.PI - 90;
            }
            if (x >= 179.5 & e < 0) {
                x = x - 360;
            }
            if (x <= -179.5 & e > 0) {
                x = x + 360;
            }
            return [x, y];
            
        } else {
            var coordinates1 = coordinate_transform(coordinates, pre_position, 'ESRI:104903', e);
            var coordinates2 = coordinate_transform(coordinates1, 'ESRI:104903', now_position, e);
            return coordinates2;

        }
    } else if (pre_position == 'ESRI:103878') {
        if (now_position == 'ESRI:104903') {
            //南极射转等距
            var R = 1737400;
            var d = Math.sqrt(Math.pow(x0, 2) + Math.pow(y0, 2));
            y = 2 * Math.atan(d / 2 / R) * 180 / Math.PI - 90;
            if (x0 == 0 & y0 >= 0) {
                x = 0;
            } else if (x0 == 0 & y0 < 0) {
                x = -180;
            } else if (x0 > 0) {
                x = Math.atan(-y0 / x0) * 180 / Math.PI + 90;
            } else if (x0 < 0) {
                x = Math.atan(-y0 / x0) * 180 / Math.PI - 90;
            }
            if (x >= 179.5 & e < 0) {
                x = x - 360;
            }
            if (x <= -179.5 & e > 0) {
                x = x + 360;
            }
            return [x, y];

        } else {
            var coordinates1 = coordinate_transform(coordinates, pre_position, 'ESRI:104903', e);
            var coordinates2 = coordinate_transform(coordinates1, 'ESRI:104903', now_position, e);
            return coordinates2;

        }
    } else if (pre_position == 'ESRI:103880') {
        if (now_position == 'ESRI:104903') {
            //正正射转等距
            var R = 1737400;
            y = Math.asin(y0 / R) * 180 / Math.PI;
            if (x0 <= R) {
                x = Math.asin(x0 / Math.sqrt(Math.pow(R, 2) - Math.pow(y0, 2))) * 180 / Math.PI;
            } else if (x0 <= 2 * R) {
                x = Math.asin((x0 - 2 * R) / Math.sqrt(Math.pow(R, 2) - Math.pow(y0, 2))) * 180 / Math.PI + 180;
            } else {
                x = Math.asin((x0 - 2 * R) / Math.sqrt(Math.pow(R, 2) - Math.pow(y0, 2))) * 180 / Math.PI - 180;
            }
            if (x >= 179 & e < 0) {
                x = x - 360;
            }
            if (x <= -179 & e > 0) {
                x = x + 360;
            }
            return [x, y];

        } else {
            var coordinates1 = coordinate_transform(coordinates, pre_position, 'ESRI:104903', e);
            var coordinates2 = coordinate_transform(coordinates1, 'ESRI:104903', now_position, e);
            return coordinates2;

        }
    } else if (pre_position == 'ESRI:103879') {
        if (now_position == 'ESRI:104903') {
            //背正射转等距
            var R = 1737400;
            y = Math.asin(y0 / R) * 180 / Math.PI;
            if (x0 < -R) {
                x = Math.asin((x0 + 2 * R) / Math.sqrt(Math.pow(R, 2) - Math.pow(y0, 2))) * 180 / Math.PI;
            } else if (x0 <= 0) {
                x = Math.asin(x0 / Math.sqrt(Math.pow(R, 2) - Math.pow(y0, 2))) * 180 / Math.PI + 180;
            } else {
                x = Math.asin(x0 / Math.sqrt(Math.pow(R, 2) - Math.pow(y0, 2))) * 180 / Math.PI - 180;
            }
            if (x >= 179 & e < 0) {
                x = x - 360;
            }
            if (x <= -179 & e > 0) {
                x = x + 360;
            }
            return [x, y];

        } else {
            var coordinates1 = coordinate_transform(coordinates, pre_position, 'ESRI:104903', e);
            var coordinates2 = coordinate_transform(coordinates1, 'ESRI:104903', now_position, e);
            return coordinates2;

        }
    }

    return false;
}

//添加要素图层
function add_overlayers(i, color) {
    var value = OverLayers_name[i][0];
    var type = OverLayers_name[i][1];

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

    if (value == "FEATURED_MOSAICS_180") {
        value_name = ["FEATURED_MOSAICS_EQ_180.json", "FEATURED_MOSAICS_NP_180.json", "FEATURED_MOSAICS_SP_180.json"];
    } else if (value == "STEREO_OBSERVATIONS_180") {
        value_name = ["STEREO_OBSERVATIONS_EQ_180.json", "STEREO_OBSERVATIONS_NP_180.json", "STEREO_OBSERVATIONS_SP_180.json"];
    } else if (value == "LROC_5TO20KM_CRATERS_180") {
        value_name = ["LROC_5TO20KM_CRATERS_0TO90E_180.json", "LROC_5TO20KM_CRATERS_0TO90W_180.json", "LROC_5TO20KM_CRATERS_90ETO180E_180.json", "LROC_5TO20KM_CRATERS_90WTO180W_180.json", "LROC_5TO20KM_CRATERS_NPOLE_180.json", "LROC_5TO20KM_CRATERS_SPOLE_180.json"];
    } else {
        value_name = [value + ".json"];
    }

    //设置图层source及style
    var vectorSource = new ol.source.Vector();
    if (type == "point") {
        //点要素
        if (color == "") {
            color = color_random();
        }
        OverLayers[i] = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 2,
                    snapToPixel: false,
                    fill: new ol.style.Fill({
                        color: color
                    }),
                })
            })
        });

    }
    else if (type == "line") {
        //线要素
        if (color == "") {
            color = color_random();
        }
        OverLayers[i] = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: color,
                    width: 1.5
                })
            })
        });
        
    }
    else if (type == "area") {
        //面要素
        if (color == "") {
            color = color_random_area();
        }
        OverLayers[i] = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: color[0],
                    width: 1.5
                }),
                fill: new ol.style.Fill({
                    color: color[1]
                })
            })
        });
        
    }

    //添加图层
    map.addLayer(OverLayers[i]);

    // 显示加载动画
    showLoader();

    var ajaxRequests = value_name.map(function (vn, i) {
        // 返回一个新的Promise
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "shp/" + proj + vn,
                success: function (data) {
                    //为每个feature添加type
                    var features = (new ol.format.GeoJSON()).readFeatures(JSON.stringify(data));
                    features.forEach(function (feature) {
                        feature.set('type', 'display1_' + value);
                    });
                    // 将要素添加到矢量源中
                    vectorSource.addFeatures(features);
                    resolve();  // 当异步操作成功时，解决Promise
                },
                error: function (error) {
                    reject(error);  // 当异步操作失败时，拒绝Promise
                }
            });
        });
    });

    // 当所有异步操作都完成时，隐藏加载动画
    Promise.all(ajaxRequests).then(hideLoader).catch(function (error) {
        //console.error('Error:', error);
        hideLoader();
    });

    return color;
}

function add_overlayers_tif(i, color) {
    var value = OverLayers_name[i][0];
    // var type = OverLayers_name[i][1];

    var extent_image = [-180.0, -90.0, 180.0, 90.0];
    if (value == 'IIM_global_mosaic_20140326_new_geo_10X10_geo_cont_IBD_2b') {
        extent_image = [-180.1696, -78.2609, 181.0804, 79.2391];
    } else if (value == 'WAC_TIO2_GCS_MB_NAN_HD') {
        extent_image = [-180, -70.2434, 180, 64.7566];
    }

    //确定坐标系
    
    var extent;
    if (po_now == 'ESRI:104903') {
        extent = extent_image;
    } else if (po_now == 'ESRI:103877') {
        extent = [-931070, -931070, 931070, 931070];
    } else if (po_now == 'ESRI:103878') {
        extent = [-931070, -931070, 931070, 931070];
    } else if (po_now == 'ESRI:103880') {
        extent = [-1737400, -1737400, 1737400, 1737400];
    } else if (po_now == 'ESRI:103879') {
        extent = [-1737400, -1737400, 1737400, 1737400];
    }
    
    value_name = [value + ".csv"];

    // 显示加载动画
    //showLoader();
    var filePath = 'tif/' + value_name;
    var dataArray;

    $.ajax({
        url: filePath,
        async: false,
        dataType: 'text',
        success: function (data) {
            Papa.parse(data, {
                header: true,
                complete: function (results) {
                    dataArray = results.data;
                    dataArray.pop();  // 需要删去最后一行（为空）
                }
            });
        }
    });

    var stringArray = dataArray.map(row => Object.values(row));  // 将数据类型由对象转为字符串
    var floatArray = stringArray.map(row => row.map(Number));  // 将数据类型由字符串转为数值

    OverLayers_tif_data[OverLayers_tif_num] = new Array();
    OverLayers_tif_data[OverLayers_tif_num][0] = value;
    OverLayers_tif_data[OverLayers_tif_num][1] = floatArray;  // 存储数据
    OverLayers_tif_num++;

    var times_image = [floatArray[0].length / (extent_image[2] - extent_image[0]), floatArray.length / (extent_image[3] - extent_image[1])];

    var array = normalizeArray(floatArray);  // 数据标准化
    var image_Url = image_create(array, color, extent_image, times_image);  // 生成图像（最耗时的一步）
    var TiffLayer = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: image_Url,
            projection: po_now,
            imageExtent: extent
        }),
        opacity: 0.75
    });

    OverLayers[i] = TiffLayer;
    map.addLayer(OverLayers[i]);

    //hideLoader();

    /*
    var blankImage = createBlankImage(array[0].length, array.length);
    const raster = new ol.source.Raster({
        sources: [
            new ol.source.ImageStatic({
                url: blankImage, // 这里可以使用一个空白图像
                imageExtent: [-180, -90, 180, 90]
            })
        ],
        operationType: 'pixel',
        operation: function (pixels, data) {
            var pixel = createOperation(pixels, data.array);
            return pixel;
        },
        lib: {
            createOperation: createOperation
        },
        
    });
    raster.set('array', array);
    raster.on('beforeoperations', function (event) {
        event.data.array = raster.get('array');
    });
    */

    return '#B0C4DE';
}
// 0-255标准化
function normalizeArray(data) {
    var data_flat = data.flat().filter(value => typeof value === 'number' && !isNaN(value));
    var min = getMin(data_flat);
    var max = getMax(data_flat);
    return data.map(row => row.map(value => Math.round((value - min) / (max - min) * 255.0)));
}
// 获取最小值
function getMin(arr) {
    let min = Infinity;
    for (let i = 0; i < arr.length; i += 10000) {
        var chunk = arr.slice(i, i + 10000);
        var chunkMin = Math.min(...chunk);
        if (chunkMin < min) {
            min = chunkMin;
        }
    }
    return min;
}
// 获取最大值
function getMax(arr) {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i += 10000) {
        var chunk = arr.slice(i, i + 10000);
        var chunkMax = Math.max(...chunk);
        if (chunkMax > max) {
            max = chunkMax;
        }
    }
    return max;
}
// 创建一个图片
function image_create(array, color, extent_image, times_image) {
    var color_scale = chroma.scale(color.split(','));
    var imageUrl;
    
    if (po_now == 'ESRI:104903') {
        var width = array[0].length;
        var height = array.length;

        // 创建一个 Canvas 元素  
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                var pixel_color = color_scale(array[pixelY][pixelX] / 255.0).rgb();  // 颜色对应
                outputData[outputIndex] = pixel_color[0];
                outputData[outputIndex + 1] = pixel_color[1];
                outputData[outputIndex + 2] = pixel_color[2];
                outputData[outputIndex + 3] = 255;
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');

    }
    else if (po_now == 'ESRI:103877') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 30;
        var width = 60 * times;
        var height = 60 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = pixelX / times * 1.0 - 30;
                var y_origin = -pixelY / times * 1.0 + 30;

                // 真实经纬度坐标
                var x;
                var y = 90 - Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2));
                // 计算真实经纬度
                if (x_origin == 0) {
                    if (y_origin >= 0) {
                        x = -180;
                    } else {
                        x = 0;
                    }
                } else if (x_origin > 0) {
                    x = Math.atan(y_origin / x_origin) / Math.PI * 180 + 90;
                } else {
                    x = Math.atan(y_origin / x_origin) / Math.PI * 180 - 90;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                if (y < 60 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    var pixel_color = color_scale(array[y_image][x_image] / 255.0).rgb();  // 颜色对应
                    outputData[outputIndex] = pixel_color[0];
                    outputData[outputIndex + 1] = pixel_color[1];
                    outputData[outputIndex + 2] = pixel_color[2];
                    outputData[outputIndex + 3] = 255;
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');

    }
    else if (po_now == 'ESRI:103878') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 30;
        var width = 60 * times;
        var height = 60 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = pixelX / times * 1.0 - 30;
                var y_origin = -pixelY / times * 1.0 + 30;

                // 真实经纬度坐标
                var x;
                var y = 90 - Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2));
                // 计算真实经纬度
                if (x_origin == 0) {
                    if (y_origin >= 0) {
                        x = 0;
                    } else {
                        x = -180;
                    }
                } else if (x_origin > 0) {
                    x = -Math.atan(y_origin / x_origin) / Math.PI * 180 + 90;
                } else {
                    x = -Math.atan(y_origin / x_origin) / Math.PI * 180 - 90;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                if (y < 60 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    var pixel_color = color_scale(array[y_image][x_image] / 255.0).rgb();  // 颜色对应
                    outputData[outputIndex] = pixel_color[0];
                    outputData[outputIndex + 1] = pixel_color[1];
                    outputData[outputIndex + 2] = pixel_color[2];
                    outputData[outputIndex + 3] = 255;
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');
    }
    else if (po_now == 'ESRI:103880') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 10;
        var width = 180 * times;
        var height = 180 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = (pixelX / times * 1.0 - 90) / 90;
                var y_origin = (-pixelY / times * 1.0 + 90) / 90;

                // 真实经纬度坐标
                var x;
                var y = Math.asin(y_origin) / Math.PI * 180;
                // 计算真实经纬度
                if (x_origin == 0) {
                    x = 0;
                } else {
                    x = Math.asin(x_origin / Math.cos(y * Math.PI / 180)) / Math.PI * 180;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                //if (Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2)) > 1 || x < extent_image[0] || x > extent_image[2] || y < extent_image[1] || y > extent_image[3]) {
                if (Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2)) > 1 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {  //因为涉及到四舍五入的问题所以不能像上面一行这么写
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    var pixel_color = color_scale((array[y_image][x_image]) / 255.0).rgb();  // 颜色对应
                    outputData[outputIndex] = pixel_color[0];
                    outputData[outputIndex + 1] = pixel_color[1];
                    outputData[outputIndex + 2] = pixel_color[2];
                    outputData[outputIndex + 3] = 255;
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');
    }
    else if (po_now == 'ESRI:103879') {
        // 创建一个 Canvas 元素
        var canvas = document.createElement('canvas');
        var times = 10;
        var width = 180 * times;
        var height = 180 * times;
        canvas.width = width;
        canvas.height = height;
        // 获取 Canvas 的 2D 上下文  
        var ctx = canvas.getContext('2d');

        // 创建一个新的 ImageData 对象用于输出图像数据
        const output = ctx.createImageData(width, height);
        const outputData = output.data;

        // 新的图像数据
        for (let pixelY = 0; pixelY < height; ++pixelY) {
            for (let pixelX = 0; pixelX < width; ++pixelX) {
                const outputIndex = (pixelY * width + pixelX) * 4;
                // 图中像素坐标
                var x_origin = (pixelX / times * 1.0 - 90) / 90;
                var y_origin = (-pixelY / times * 1.0 + 90) / 90;

                // 真实经纬度坐标
                var x;
                var y = Math.asin(y_origin) / Math.PI * 180;
                // 计算真实经纬度
                if (x_origin == 0) {
                    x = -180;
                } else if (x_origin > 0) {
                    x = 180 - Math.asin(x_origin / Math.cos(y * Math.PI / 180)) / Math.PI * 180;
                } else {
                    x = -180 - Math.asin(x_origin / Math.cos(y * Math.PI / 180)) / Math.PI * 180;
                }

                // 对应数据坐标
                var x_image = Math.round((x - extent_image[0]) * times_image[0]);
                var y_image = Math.round((extent_image[3] - y) * times_image[1]);
                if (x >= 179 && x_image == array[0].length) {
                    x_image = Math.round((x - extent_image[0] - 360) * times_image[0]);
                }

                if (Math.sqrt(Math.pow(x_origin, 2) + Math.pow(y_origin, 2)) > 1 || x_image < 0 || x_image >= array[0].length || y_image >= array.length || y_image < 0) {
                    outputData[outputIndex] = 0;
                    outputData[outputIndex + 1] = 0;
                    outputData[outputIndex + 2] = 0;
                    outputData[outputIndex + 3] = 0;
                } else {
                    var pixel_color = color_scale(array[y_image][x_image] / 255.0).rgb();  // 颜色对应
                    outputData[outputIndex] = pixel_color[0];
                    outputData[outputIndex + 1] = pixel_color[1];
                    outputData[outputIndex + 2] = pixel_color[2];
                    outputData[outputIndex + 3] = 255;
                }
            }
        }

        ctx.putImageData(output, 0, 0);

        imageUrl = canvas.toDataURL('image/png');
    }
    return imageUrl;
}

/*
//生成一张空白图片
function createBlankImage(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');
    context.fillStyle = 'white'; // 你可以根据需要更改颜色
    context.fillRect(0, 0, width, height);
    return canvas.toDataURL();
}
*/
/*
function createOperation(pixels, array) {
    if (!Array.isArray(array)) {
        return [0, 0, 0, 255]; // 如果 array 无效，返回黑色像素
    }
    var pixel = pixels[0];
    var x = Math.floor(pixel[0] / 0.5);
    var y = Math.floor(pixel[1] / 0.5);
    console.log(pixels);

    if (x >= 0 && x < array[0].length && y >= 0 && y < array.length) {
        return [array[y][x], array[y][x], array[y][x], 255];
        //return [230, 200, 0, 240];
    } else {
        return [0, 0, 0, 255]; // 返回黑色像素
    }
    
    //return [array[y][x], array[y][x], array[y][x], 255];
};
*/

//划定显示范围
/*
function coordinate_extent(now_position) {
    var cricle, center, radius;
    if (now_position == 'ESRI:103877') {
        center = [0, 0];
        radius = 931069.8539;
    } else if (now_position == 'ESRI:103878') {
        center = [0, 0];
        radius = 931069.8539;
    } else if (now_position == 'ESRI:103880') {
        center = [0, 0];
        radius = 1737400;
    } else if (now_position == 'ESRI:103879') {
        center = [0, 0];
        radius = 1737400;
    }
    cricle = new ol.geom.Circle(center, radius);
    return cricle;
}
*/