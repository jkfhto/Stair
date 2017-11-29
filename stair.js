/**
 * Created by ZJ on 2017/8/8 REVISION: 2
 */
var _Math = {

    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,

    generateUUID: function () {

        // http://www.broofa.com/Tools/Math.uuid.htm

        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split( '' );
        var uuid = new Array( 36 );
        var rnd = 0, r;

        return function generateUUID() {

            for ( var i = 0; i < 36; i ++ ) {

                if ( i === 8 || i === 13 || i === 18 || i === 23 ) {

                    uuid[ i ] = '-';

                } else if ( i === 14 ) {

                    uuid[ i ] = '4';

                } else {

                    if ( rnd <= 0x02 ) rnd = 0x2000000 + ( Math.random() * 0x1000000 ) | 0;
                    r = rnd & 0xf;
                    rnd = rnd >> 4;
                    uuid[ i ] = chars[ ( i === 19 ) ? ( r & 0x3 ) | 0x8 : r ];

                }

            }

            return uuid.join( '' );

        };

    }(),

    clamp: function ( value, min, max ) {

        return Math.max( min, Math.min( max, value ) );

    },

    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation

    euclideanModulo: function ( n, m ) {

        return ( ( n % m ) + m ) % m;

    },

    // Linear mapping from range <a1, a2> to range <b1, b2>

    mapLinear: function ( x, a1, a2, b1, b2 ) {

        return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

    },

    // https://en.wikipedia.org/wiki/Linear_interpolation

    lerp: function ( x, y, t ) {

        return ( 1 - t ) * x + t * y;

    },

    // http://en.wikipedia.org/wiki/Smoothstep

    smoothstep: function ( x, min, max ) {

        if ( x <= min ) return 0;
        if ( x >= max ) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * ( 3 - 2 * x );

    },

    smootherstep: function ( x, min, max ) {

        if ( x <= min ) return 0;
        if ( x >= max ) return 1;

        x = ( x - min ) / ( max - min );

        return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

    },

    // Random integer from <low, high> interval

    randInt: function ( low, high ) {

        return low + Math.floor( Math.random() * ( high - low + 1 ) );

    },

    // Random float from <low, high> interval

    randFloat: function ( low, high ) {

        return low + Math.random() * ( high - low );

    },

    // Random float from <-range/2, range/2> interval

    randFloatSpread: function ( range ) {

        return range * ( 0.5 - Math.random() );

    },

    degToRad: function ( degrees ) {

        return degrees * _Math.DEG2RAD;

    },

    radToDeg: function ( radians ) {

        return radians * _Math.RAD2DEG;

    },

    isPowerOfTwo: function ( value ) {

        return ( value & ( value - 1 ) ) === 0 && value !== 0;

    },

    nearestPowerOfTwo: function ( value ) {

        return Math.pow( 2, Math.round( Math.log( value ) / Math.LN2 ) );

    },

    nextPowerOfTwo: function ( value ) {

        value --;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value ++;

        return value;

    }

};
THREE.Camera.prototype.getWorldDirection = function () {

        var quaternion = new THREE.Quaternion();

        return function getWorldDirection( optionalTarget ) {

            var result = optionalTarget || new THREE.Vector3();

            this.getWorldQuaternion( quaternion );
            //将旋转矩阵转换成四元数

            return result.set( 0, 0, - 1 ).applyQuaternion( quaternion );
            //默认法向量是指向Z轴负方向，乘以旋转四元数 更新法向量

        };

}()
THREE.Object3D.prototype.getWorldQuaternion=function(){

    var position = new THREE.Vector3();
    var scale = new THREE.Vector3();

    return function getWorldQuaternion( optionalTarget ) {

        var result = optionalTarget || new Quaternion();

        this.updateMatrixWorld( true );

        this.matrixWorld.decompose( position, result, scale );
        //将模型矩阵的平移、旋转和缩放设置作为由三个 Vector3 对象组成的矢量返回。第一个 Vector3 对象容纳平移元素。第二个 Vector3 对象容纳旋转元素。第三个 Vector3 对象容纳缩放元素。   
        return result;

    };

}()

THREE.Vector3.prototype.setFromSpherical=function(s){
    var sinPhiRadius = Math.sin( s.phi ) * s.radius;

    this.x = sinPhiRadius * Math.sin( s.theta );
    this.y = Math.cos( s.phi ) * s.radius;
    this.z = sinPhiRadius * Math.cos( s.theta );

    return this;

}

// THREE.Face3.prototype.facelx=0;
// THREE.Face3=function( a, b, c, normal, color, materialIndex,faceLx ) {
//         // faceLx  默认：0表示平台面  1：表示台阶面 
//         this.a = a;
//         this.b = b;
//         this.c = c;

//         this.normal = (normal && normal.isVector3) ? normal : new THREE.Vector3();
//         this.vertexNormals = Array.isArray( normal ) ? normal : [];

//         this.color = (color && color.isColor) ? color : new THREE.Color();
//         this.vertexColors = Array.isArray( color ) ? color : [];

//         this.materialIndex = materialIndex !== undefined ? materialIndex : 0;
//         this.faceLx = faceLx !== undefined ? faceLx : 0;
// }
THREE.ImageLoader.prototype.setPath=function(value){
    this.path = value;
    return this;
}

THREE.PerspectiveCamera.prototype.isPerspectiveCamera=true;
THREE.OrthographicCamera.prototype.isOrthographicCamera=true;
THREE.OrthographicCamera.zoom=1;
THREE.OrthographicCamera.view=null;
THREE.OrthographicCamera.prototype.updateProjectionMatrix2=function () {
        var dx = ( this.right - this.left ) / ( 2 * this.zoom );
        var dy = ( this.top - this.bottom ) / ( 2 * this.zoom );
        var cx = ( this.right + this.left ) / 2;
        var cy = ( this.top + this.bottom ) / 2;
        var left = cx - dx;
        var right = cx + dx;
        var top = cy + dy;
        var bottom = cy - dy;
        this.projectionMatrix.makeOrthographic( left, right, top, bottom, this.near, this.far );
    }

THREE.Raycaster.prototype.setFromCamera=function(coords, camera){
    if ( (camera && camera.isPerspectiveCamera) ) {
        this.ray.origin.setFromMatrixPosition( camera.matrixWorld );//将相机的平移矩阵TX,TY,TZ值组成的向量（类似于相机位置），作为射线的原点
        this.ray.direction.set( coords.x, coords.y, 0.5 ).unproject( camera ).sub( this.ray.origin ).normalize();//点击处的世界坐标减去射线原点的位置，组成的向量作为射线的方向向量
        //this.ray.direction.set( coords.x, coords.y, 0.5 ).unproject( camera )将点击处的屏幕坐标转成世界坐标
    } else if ( (camera && camera.isOrthographicCamera) ) {
        this.ray.origin.set( coords.x, coords.y, ( camera.near + camera.far ) / ( camera.near - camera.far ) ).unproject( camera ); // set origin in plane of camera
        this.ray.direction.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );
    } else {
        console.error( 'THREE.Raycaster: Unsupported camera type.' );

    }
}

THREE.Spherical=function(radius, phi, theta){
    this.radius = ( radius !== undefined ) ? radius : 1.0;
    this.phi = ( phi !== undefined ) ? phi : 0; // up / down towards top and bottom pole
    this.theta = ( theta !== undefined ) ? theta : 0; // around the equator of the sphere
    return this;
}
THREE.Spherical.prototype = {
    constructor: THREE.Spherical,
    set: function ( radius, phi, theta ) {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
        return this;
    },
    clone: function () {
        return new this.constructor().copy( this );
    },
    copy: function ( other ) {
        this.radius = other.radius;
        this.phi = other.phi;
        this.theta = other.theta;
        return this;
    },
    // restrict phi to be betwee EPS and PI-EPS
    makeSafe: function() {
        var EPS = 0.000001;
        this.phi = Math.max( EPS, Math.min( Math.PI - EPS, this.phi ) );
        return this;
    },
    setFromVector3: function( vec3 ) {
        this.radius = vec3.length();
        if ( this.radius === 0 ) {
            this.theta = 0;
            this.phi = 0;
        } else {
            this.theta = Math.atan2( vec3.x, vec3.z ); // equator angle around y-up axis
            this.phi = Math.acos( _Math.clamp( vec3.y / this.radius, - 1, 1 ) ); // polar angle

        }
        return this;
    }
};
function copyObj( obj ) {//深拷贝 用于将索引转成数据 用于解决将对象数组1赋值给对象数组2后，对象数组1元素改变导致对象数组2元素改变的问题
    var txt = JSON.stringify( obj );//用于从一个对象解析出字符串
    return JSON.parse( txt );//用于从一个字符串中解析出json对象
}
JSQEXBasicStructure.JSQEX_Stair = function(a) {
    JSQEXBasicStructure.BasicStructure.call(this, a);
    this.JSQEX_stairsMesh_arr = [];
    this.JSQEX_stairsMesh = null;
    this.JSQEX_geom=null ;
    this.JSQEX_stairsMaterial=null;
    this.JSQEX_verticesnum=0;
    this.JSQEX_vertices=[];
    this.JSQEX_faces=[];
    this.JSQEX_faceVertexUvs=[];
    this.JSQEX_stairsuv = [[new THREE.Vector2(0,1),new THREE.Vector2(0,0), new THREE.Vector2(1,1)],[new THREE.Vector2(0,0), new THREE.Vector2(1,0), new THREE.Vector2(1,1)]];
    this.JSQEX_Currentobjectindex=null;
    this.JSQEX_container=null;
    this.JSQEX_parent=null;
    this.JSQEX_object_type={};
    this.JSQEX_pdnum=1;//判断绘图时拖动方向
    this.JSQEX_uvlx=99;
    this.JSQEX_initialdata={};
    this.JSQEX_initialdataarr=[];
    this.JSQEX_Texturescale=[];
    this.JSQEX_Texturesize=[[8,8],[8,8],[8,8],[8,8],[8,8],[8,8],[8,8],[8,8],[8,8],[8,8],[8,8],[8,8]];
    this.JSQEX_armrest=[[],[],[],[],[]];
    this.JSQEX_BoxHelper=null;
    this.JSQEX_Railingoffset={f_b:.5,l_r:.2}
    this.JSQEX_jdpoints=[];
};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Stair, JSQEXBasicStructure.BasicStructure);
JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Stair";
// JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_importData = function(data) {
//     this.JSQEX_materialurl=data.materialsurl;
// };

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_dispose = function() {
        this.JSQEX_verticesnum=0;
        this.JSQEX_vertices=[];
        this.JSQEX_faces=[];
        this.JSQEX_faceVertexUvs=[];
};

// JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_dump = function() {
//     var b = JSQEXBasicStructure.JSQEX_Stair.superClass_.JSQEX_dump.call( this );
//     var c = b[0];
//     c.JSQEX_materialurl=this.JSQEX_materialurl;
//     return b;
// };

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_dump = function() {
    var b = JSQEXBasicStructure.JSQEX_Stair.superClass_.JSQEX_dump.call( this );
    var c = b[0];
    c.JSQEX_initialdata=this.JSQEX_initialdata;
    return b;
};

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_load = function(data, callback) {
    // this.JSQEX_drawstair(this.JSQEX_points,this.JSQEX_segmentInfo);
    // console.log("读取数据："+"----------data"+JSON.stringify(data));
    // console.log(this)
    this.JSQEX_initialdataarr=data.JSQEX_initialdataarr;
    if(data.JSQEX_initialdataarr[0]){
        this.attachID=data.JSQEX_initialdataarr[0].attachID;
        this.graphID=data.JSQEX_initialdataarr[0].graphID;
    }
    if(typeof callback === "function"){
        callback();         
    }
};

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_changeMaterial = function(index,json,operation) {//材质修改index材质索引： 0：台阶上下面 1：台阶前后左右 2：支撑梁上下面 3：支撑梁前后左右面 4：侧弦上下面  5：侧弦前后左右面  :6：平台上下面 7：平台前后左右面 .json:图片路径
    if(index==undefined){
        return;
    }
    var Currentobjectindex=this.JSQEX_checkindex(this.JSQEX_Currentobjectindex);
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.material.materials[index].map.dispose();
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.material.materials[index].dispose();
    var index11=parseInt(Math.random()*20)+1;
    var url = json != undefined ? json.src[0] : "css/pic"+index11+".jpg";
    if(operation!=null){
        url=operation.url;
    }
    var width,height;
    if(json!=undefined){
        for(var key in this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_initialdata.materials[index]){
            if(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_initialdata.materials[index].hasOwnProperty(key)) {
                this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_initialdata.materials[index][key]=null;
            }
    　　}
        this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_initialdata.materials[index]=null;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_initialdata.materials[index]=copyObj(json);
        width=json.realSize[0][0];
        height=json.realSize[0][1];
        this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_Calculate_uv(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_object_type,index,null,width,height);
    }
    var changeTexture = THREE.ImageUtils.loadTexture(url,null,this.JSQEX_isPowerOfTwo.bind(this.JSQEX_stairsMesh_arr[Currentobjectindex],index));
    // changeTexture.wrapS = changeTexture.wrapT = THREE.RepeatWrapping;
    // changeTexture.wrapS = changeTexture.wrapT = THREE.RepeatWrapping;
    changeTexture.repeat.set(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_Texturescale[index][0],this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_Texturescale[index][1]);
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.material.materials[index].map = changeTexture;
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.material.materials[index].needsUpdate=true;
    if(!this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.open&&operation==null){
        if(index==0){
            this.JSQEX_changeMaterial(3,json,{url:url})
        }
        if(index==1){
            this.JSQEX_changeMaterial(4,json,{url:url})
        }
        if(index==2){
            this.JSQEX_changeMaterial(5,json,{url:url})
        }
    }
};

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_computeBoundingBox=function(points) {
    var minX = + Infinity;
    var minY = + Infinity;
    var minZ = + Infinity;
    var maxX = - Infinity;
    var maxY = - Infinity;
    var maxZ = - Infinity;
    for ( var i = 0, il = points.length; i < il; i ++ ) {
            min( points[i]);
            max( points[i]);
        }
    return   {max:new THREE.Vector3(maxX,maxY,maxZ),min:new THREE.Vector3(minX,minY,minZ)};
    function min( v ) {
        minX = Math.min( minX, v.x );
        minY = Math.min( minY, v.y );
        minZ = Math.min( minZ, v.z );
    };
    function max( v ) {
        maxX = Math.max( maxX, v.x );
        maxY = Math.max( maxY, v.y );
        maxZ = Math.max( maxZ, v.z );
    };
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_Getnormal = function(fxver){//获取逆时针的法向量
    var _fxver=new THREE.Vector3(fxver.x,0,fxver.z); 
    var normal =new THREE.Vector3(-_fxver.z,0,_fxver.x);
    if(fxver.x==0&&fxver.y!=0){
        _fxver=new THREE.Vector3(fxver.x,fxver.y,0); 
        normal =new THREE.Vector3(-fxver.y,fxver.x,0);
    }
    if(_fxver.x*normal.z-_fxver.z*normal.x<0){
         normal.multiplyScalar(-1);
    }
    return normal.normalize();
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_changefaceVertexUvs = function(json) {
    var _scale=json.scale!=undefined?json.scale:new THREE.Vector2(1,1);
    if(json.lx==1){
        var _arr=json.arr;
        // var _scale=json.scale
        for(var i=0;i<_arr.length;i+=2){
            var materialInd=json.materialInd!=undefined?json.materialInd:0;
            var faceInd=json.faceInd!=undefined?json.faceInd:0;
            _arr[i]!=undefined&&this.JSQEX_faces.push(new THREE.Face3(_arr[i][0],_arr[i][1],_arr[i][2],null,null,materialInd,faceInd));
            _arr[i+1]!=undefined&&this.JSQEX_faces.push(new THREE.Face3(_arr[i+1][0],_arr[i+1][1],_arr[i+1][2],null,null,materialInd,faceInd));
            _arr[i]!=undefined&&this.JSQEX_faceVertexUvs.push([this.JSQEX_stairsuv[0][0].clone().multiply(_scale),this.JSQEX_stairsuv[0][1].clone().multiply(_scale),this.JSQEX_stairsuv[0][2].clone().multiply(_scale)]); 
            _arr[i+1]!=undefined&&this.JSQEX_faceVertexUvs.push([this.JSQEX_stairsuv[1][0].clone().multiply(_scale),this.JSQEX_stairsuv[1][1].clone().multiply(_scale),this.JSQEX_stairsuv[1][2].clone().multiply(_scale)]);
        }
    }else if(json.lx==2){
        var _arr=json.arr;
        for(var i=0;i<_arr.length;i++){
            var materialInd=json.materialInd!=undefined?json.materialInd:0;
            var faceInd=json.faceInd!=undefined?json.faceInd:0;
            this.JSQEX_faces.push(new THREE.Face3(_arr[i][0],_arr[i][1],_arr[i][2],null,null,materialInd,faceInd));
            if(json.uvlx==1){
                var uv1=new THREE.Vector2((this.JSQEX_vertices[_arr[i][0]].x-json.min_max1.min.x)/(json.min_max1.max.x-json.min_max1.min.x),(this.JSQEX_vertices[_arr[i][0]].y-json.min_max1.min.y)/(json.min_max1.max.y-json.min_max1.min.y));
                var uv2=new THREE.Vector2((this.JSQEX_vertices[_arr[i][1]].x-json.min_max1.min.x)/(json.min_max1.max.x-json.min_max1.min.x),(this.JSQEX_vertices[_arr[i][1]].y-json.min_max1.min.y)/(json.min_max1.max.y-json.min_max1.min.y));
                var uv3=new THREE.Vector2((this.JSQEX_vertices[_arr[i][2]].x-json.min_max1.min.x)/(json.min_max1.max.x-json.min_max1.min.x),(this.JSQEX_vertices[_arr[i][2]].y-json.min_max1.min.y)/(json.min_max1.max.y-json.min_max1.min.y));
                if(_scale.x!=1||_scale.y!=1){
                    uv1.multiply(_scale);
                    uv2.multiply(_scale);
                    uv3.multiply(_scale);
                }
                this.JSQEX_faceVertexUvs.push(
                    [uv1,uv2,uv3]
                )
            } 
            else if(json.uvlx==2){
                var uv1=new THREE.Vector2((this.JSQEX_vertices[_arr[i][0]].x-json.min_max1.min.x)/(json.min_max1.max.x-json.min_max1.min.x),(this.JSQEX_vertices[_arr[i][0]].z-json.min_max1.min.z)/(json.min_max1.max.z-json.min_max1.min.z));
                var uv2=new THREE.Vector2((this.JSQEX_vertices[_arr[i][1]].x-json.min_max1.min.x)/(json.min_max1.max.x-json.min_max1.min.x),(this.JSQEX_vertices[_arr[i][1]].z-json.min_max1.min.z)/(json.min_max1.max.z-json.min_max1.min.z));
                var uv3=new THREE.Vector2((this.JSQEX_vertices[_arr[i][2]].x-json.min_max1.min.x)/(json.min_max1.max.x-json.min_max1.min.x),(this.JSQEX_vertices[_arr[i][2]].z-json.min_max1.min.z)/(json.min_max1.max.z-json.min_max1.min.z));
                if(_scale.x!=1||_scale.y!=1){
                    uv1.multiply(_scale);
                    uv2.multiply(_scale);
                    uv3.multiply(_scale);
                }
                this.JSQEX_faceVertexUvs.push(
                   [uv1,uv2,uv3]
                )
            }else if(json.uvlx==3){
                var uv1=new THREE.Vector2((this.JSQEX_vertices[_arr[i][0]].z-json.min_max1.min.z)/(json.min_max1.max.z-json.min_max1.min.z),(this.JSQEX_vertices[_arr[i][0]].y-json.min_max1.min.y)/(json.min_max1.max.y-json.min_max1.min.y));
                var uv2=new THREE.Vector2((this.JSQEX_vertices[_arr[i][1]].z-json.min_max1.min.z)/(json.min_max1.max.z-json.min_max1.min.z),(this.JSQEX_vertices[_arr[i][1]].y-json.min_max1.min.y)/(json.min_max1.max.y-json.min_max1.min.y));
                var uv3=new THREE.Vector2((this.JSQEX_vertices[_arr[i][2]].z-json.min_max1.min.z)/(json.min_max1.max.z-json.min_max1.min.z),(this.JSQEX_vertices[_arr[i][2]].y-json.min_max1.min.y)/(json.min_max1.max.y-json.min_max1.min.y));
                if(_scale.x!=1||_scale.y!=1){
                    uv1.multiply(_scale);
                    uv2.multiply(_scale);
                    uv3.multiply(_scale);
                }
                this.JSQEX_faceVertexUvs.push(
                   [uv1,uv2,uv3]
                )
            }else{
                var pdjson=json.min_max1;
                if(i>=2&&json.min_max2!=undefined){
                    pdjson=json.min_max2;
                }
                var uv1=new THREE.Vector2((this.JSQEX_vertices[_arr[i][0]].x-pdjson.min.x)/(pdjson.max.x-pdjson.min.x),(this.JSQEX_vertices[_arr[i][0]].y-pdjson.min.y)/(pdjson.max.y-pdjson.min.y));
                var uv2=new THREE.Vector2((this.JSQEX_vertices[_arr[i][1]].x-pdjson.min.x)/(pdjson.max.x-pdjson.min.x),(this.JSQEX_vertices[_arr[i][1]].y-pdjson.min.y)/(pdjson.max.y-pdjson.min.y));
                var uv3=new THREE.Vector2((this.JSQEX_vertices[_arr[i][2]].x-pdjson.min.x)/(pdjson.max.x-pdjson.min.x),(this.JSQEX_vertices[_arr[i][2]].y-pdjson.min.y)/(pdjson.max.y-pdjson.min.y));
                if(_scale.x!=1||_scale.y!=1){
                    uv1.multiply(_scale);
                    uv2.multiply(_scale);
                    uv3.multiply(_scale);
                }
                this.JSQEX_faceVertexUvs.push(
                    [uv1,uv2,uv3]
                )
            }
            
        }
    }else if(json.lx==3){
        var facearr1=[],facearr2=[];
        for(var ii=0;ii<5;ii++){
            facearr1.push(this.JSQEX_vertices[this.JSQEX_vertices.length-10+ii]);
            facearr2.push(this.JSQEX_vertices[this.JSQEX_vertices.length-10+ii+5]); 
        }
        var min_max1=this.JSQEX_computeBoundingBox(facearr1);
        var min_max2=this.JSQEX_computeBoundingBox(facearr2);
        // this.JSQEX_changefaceVertexUvs({lx:3,min_max1:min_max1,min_max2:min_max2});
        this.JSQEX_faces.push(
            new THREE.Face3(this.JSQEX_vertices.length-10,this.JSQEX_vertices.length-8,this.JSQEX_vertices.length-9,null,null,6),
            new THREE.Face3(this.JSQEX_vertices.length-8,this.JSQEX_vertices.length-7,this.JSQEX_vertices.length-9,null,null,6),
            new THREE.Face3(this.JSQEX_vertices.length-7,this.JSQEX_vertices.length-6,this.JSQEX_vertices.length-9,null,null,6),
            new THREE.Face3(this.JSQEX_vertices.length-4,this.JSQEX_vertices.length-1,this.JSQEX_vertices.length-5,null,null,6),
            new THREE.Face3(this.JSQEX_vertices.length-1,this.JSQEX_vertices.length-2,this.JSQEX_vertices.length-5,null,null,6),
            new THREE.Face3(this.JSQEX_vertices.length-2,this.JSQEX_vertices.length-3,this.JSQEX_vertices.length-5,null,null,6)
        )
        this.JSQEX_faceVertexUvs.push(
            [new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-10].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-10].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-8].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-8].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-9].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-9].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y))],
            [new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-8].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-8].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-7].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-7].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-9].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-9].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y))],
            [new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-7].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-7].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-6].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-6].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-9].x-min_max1.min.x)/(min_max1.max.x-min_max1.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-9].y-min_max1.min.y)/(min_max1.max.y-min_max1.min.y))],

            [new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-4].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-4].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-1].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-1].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-5].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-5].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y))],
            [new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-1].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-1].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-2].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-2].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-5].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-5].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y))],
            [new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-2].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-2].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-3].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-3].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y)),
            new THREE.Vector2((this.JSQEX_vertices[this.JSQEX_vertices.length-5].x-min_max2.min.x)/(min_max2.max.x-min_max2.min.x),(this.JSQEX_vertices[this.JSQEX_vertices.length-5].y-min_max2.min.y)/(min_max2.max.y-min_max2.min.y))]
        )
        var _arr=[
            [this.JSQEX_vertices.length-9,this.JSQEX_vertices.length-6,this.JSQEX_vertices.length-4],
            [this.JSQEX_vertices.length-6,this.JSQEX_vertices.length-1,this.JSQEX_vertices.length-4],
            [this.JSQEX_vertices.length-5,this.JSQEX_vertices.length-3,this.JSQEX_vertices.length-10],
            [this.JSQEX_vertices.length-3,this.JSQEX_vertices.length-8,this.JSQEX_vertices.length-10],
            [this.JSQEX_vertices.length-5,this.JSQEX_vertices.length-10,this.JSQEX_vertices.length-4],
            [this.JSQEX_vertices.length-10,this.JSQEX_vertices.length-9,this.JSQEX_vertices.length-4],
            [this.JSQEX_vertices.length-6,this.JSQEX_vertices.length-7,this.JSQEX_vertices.length-1],
            [this.JSQEX_vertices.length-7,this.JSQEX_vertices.length-2,this.JSQEX_vertices.length-1],
            [this.JSQEX_vertices.length-8,this.JSQEX_vertices.length-3,this.JSQEX_vertices.length-7],
            [this.JSQEX_vertices.length-3,this.JSQEX_vertices.length-2,this.JSQEX_vertices.length-7]]
        this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:6});
    }else if(json.lx==4){
        var _arr=json.arr;
        var u1,u2,u3,v1,v2,v3;
        var num=json.num;
        var index=json.index;
        var height=json.height;
        if(json.side==2){
            u2=(num-1-index)/num*(_scale.x||1);
            u1=(num-index)/num*(_scale.x||1);
            u4=(num-1-index)/num*(_scale.x||1);
            u3=(num-index)/num*(_scale.x||1);
        }else{
            u1=(num-1-index)/num*(_scale.x||1);
            u2=(num-index)/num*(_scale.x||1);
            u3=(num-1-index)/num*(_scale.x||1);
            u4=(num-index)/num*(_scale.x||1);
        }
        for(var i=0,j=_arr.length;i<j;i++){
            var materialInd=json.materialInd!=undefined?json.materialInd:0;
            var faceInd=json.faceInd!=undefined?json.faceInd:0;
            this.JSQEX_faces.push(new THREE.Face3(_arr[i][0],_arr[i][1],_arr[i][2],null,null,materialInd,faceInd));
            if(i%2==0){
                v1=this.JSQEX_vertices[_arr[i][0]].y/height;
                v2=this.JSQEX_vertices[_arr[i][2]].y/height;
                v3=this.JSQEX_vertices[_arr[i][1]].y/height;
                this.JSQEX_faceVertexUvs.push([new THREE.Vector2(u1,v1),new THREE.Vector2(u3,v3), new THREE.Vector2(u2,v2)]);  
            }else{
                v2=this.JSQEX_vertices[_arr[i][2]].y/height;
                v3=this.JSQEX_vertices[_arr[i][0]].y/height;
                v4=this.JSQEX_vertices[_arr[i][1]].y/height
                this.JSQEX_faceVertexUvs.push([new THREE.Vector2(u3,v3),new THREE.Vector2(u4,v4), new THREE.Vector2(u2,v2)]);  
            }   
        }
    }else if(json.lx==5){
        var _arr=json.arr;
        var lengthuvx=new THREE.Vector3().subVectors(json.points.point1,json.points.point2);
        var lengthuvy=new THREE.Vector3().subVectors(json.points.point1,json.points.point3);
        var uvy=new THREE.Vector3().subVectors(json.points.point1,json.points.point3);
        var uvx=new THREE.Vector3().subVectors(json.points.point4,json.points.point3);
        for(var i=0,j=_arr.length;i<j;i++){
            var materialInd=json.materialInd!=undefined?json.materialInd:0;
            var faceInd=json.faceInd!=undefined?json.faceInd:0;
            this.JSQEX_faces.push(new THREE.Face3(_arr[i][0],_arr[i][1],_arr[i][2],null,null,materialInd,faceInd));
            var uvx1=new THREE.Vector3().subVectors(this.JSQEX_vertices[_arr[i][0]],json.points.point3).dot(uvx.clone().normalize())/uvx.length();
            var uvy1=new THREE.Vector3().subVectors(this.JSQEX_vertices[_arr[i][0]],json.points.point3).dot(uvy.clone().normalize())/uvy.length();
            var uvx2=new THREE.Vector3().subVectors(this.JSQEX_vertices[_arr[i][1]],json.points.point3).dot(uvx.clone().normalize())/uvx.length();
            var uvy2=new THREE.Vector3().subVectors(this.JSQEX_vertices[_arr[i][1]],json.points.point3).dot(uvy.clone().normalize())/uvy.length();
            var uvx3=new THREE.Vector3().subVectors(this.JSQEX_vertices[_arr[i][2]],json.points.point3).dot(uvx.clone().normalize())/uvx.length();
            var uvy3=new THREE.Vector3().subVectors(this.JSQEX_vertices[_arr[i][2]],json.points.point3).dot(uvy.clone().normalize())/uvy.length();
            if(_scale.x!=1||_scale.y!=1){
                uvx1*=_scale.x;
                uvy1*=_scale.y;
                uvx2*=_scale.x;
                uvy2*=_scale.y;
                uvx3*=_scale.x;
                uvy3*=_scale.y;
            }
            this.JSQEX_faceVertexUvs.push([new THREE.Vector2(uvx1,uvy1),new THREE.Vector2(uvx2,uvy2), new THREE.Vector2(uvx3,uvy3)]);
        }
    }else if(json.lx==6){
        var _arr=json.arr;
        for(var i=0;i<_arr.length;i+=2){
            var materialInd=json.materialInd!=undefined?json.materialInd:0;
            var faceInd=json.faceInd!=undefined?json.faceInd:0;
            var vnum=1-(this.JSQEX_vertices[_arr[i][0]].y-this.JSQEX_vertices[_arr[i][1]].y)/json.allheight;
            // console.log(vnum)
            _arr[i]!=undefined&&this.JSQEX_faces.push(new THREE.Face3(_arr[i][0],_arr[i][1],_arr[i][2],null,null,materialInd,faceInd));
            _arr[i+1]!=undefined&&this.JSQEX_faces.push(new THREE.Face3(_arr[i+1][0],_arr[i+1][1],_arr[i+1][2],null,null,materialInd,faceInd));
            var uv1=new THREE.Vector2(0,1);
            var uv2=new THREE.Vector2(0,vnum);
            var uv3=new THREE.Vector2(1,1);
            var uv4=new THREE.Vector2(0,vnum);
            var uv5=new THREE.Vector2(1,vnum);
            var uv6= new THREE.Vector2(1,1);
            if(_scale.x!=1||_scale.y!=1){
                uv1.multiply(_scale);
                uv2.multiply(_scale);
                uv3.multiply(_scale);
                uv4.multiply(_scale);
                uv5.multiply(_scale);
                uv6.multiply(_scale);
            }
            _arr[i]!=undefined&&this.JSQEX_faceVertexUvs.push([uv1,uv2,uv3]); 
            _arr[i+1]!=undefined&&this.JSQEX_faceVertexUvs.push([uv4,uv5,uv6]);
        }
    }   
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_pdyval = function(arr,_num) {
    // if(this.tjlx.floor){
    //     _num=0;
    // }
    for(var i=0;i<arr.length;i++){
           if(arr[i].y<_num){
            arr[i].y=_num;
           }
        }
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_AddStair = function(Added){//在场景中添加楼梯对象
    this.JSQEX_geom=new THREE.Geometry();
    this.JSQEX_geom.vertices = this.JSQEX_vertices;
    this.JSQEX_geom.faces = this.JSQEX_faces;
    this.JSQEX_geom.faceVertexUvs[0]=this.JSQEX_faceVertexUvs;
    this.JSQEX_geom.computeFaceNormals();
    // console.log(this.JSQEX_stairsMaterial)
    if(this.JSQEX_stairsMaterial==null){
        // var TextureLoader=new THREE.TextureLoader();
        // TextureLoader.crossOrigin = 'Anonymous';
        var materials=[];
        // this.JSQEX_initialdata.materials=[];
        for(var i=0;i<9;i++){
             materials.push(new THREE.MeshPhongMaterial());
             var _obj=this.JSQEX_initialdata.materials[i]!=undefined?this.JSQEX_initialdata.materials[i]:{"mode":"mould","nValue":2,"nUnits":1,"map":[0],"value":[8,8],"cycle":[["a","0"],["0","b"],["-a","0"],["0","-b"]],"position":[["0","0"]],"clipSize":[["a","b"]],"radius":[["0","0","0","0"]],"src":["http://res.gezlife.com/resource/Imgs/uploads/model/201706/13/155995L/155995_UV_COS.jpg"],"realSize":[[8,8]],"type":"A","id":["B_157527_160621_157527"],"backupSrc":[[]],"model":["富之岛/富丽/450"],"matRotate":["0"],"bgRefSrc":"","reflexParameter":[""],"blurValue":["0.85"],"reflexMinQuality":[""],"reflexMidQuality":[""],"reflexMaxQuality":[""],"map_yy":[""],"map_gg":[""],"map_fx":[""],"map_zh":[""],"refSrc":[""],"chamferRanges":[[true,true,true,true]],"normals":[1],"method":"roll","rotation":"0","paveDetail":{"ifAngle":[false],"angleEdge":["5"],"ifPave":true,"paveType":"","paveData":{"paveWay":"roll","paveDire":"0","paveSize":"4"}},"rotCenter":{"x":0,"y":0},"lines":[0.03],"bgSrc":"common/images/color/c_cement.jpg?13","lineWidth":0.03};
             this.JSQEX_initialdata.materials.push(_obj);
             materials[i].map= THREE.ImageUtils.loadTexture(_obj.src,null,this.JSQEX_isPowerOfTwo.bind(this,i));
        }
        if(this.JSQEX_object_type.ltype||this.JSQEX_object_type.utype){
            for(var i=9;i<11;i++){
             materials.push(new THREE.MeshPhongMaterial());
             var _obj=this.JSQEX_initialdata.materials[i]!=undefined?this.JSQEX_initialdata.materials[i]:{"mode":"mould","nValue":2,"nUnits":1,"map":[0],"value":[8,8],"cycle":[["a","0"],["0","b"],["-a","0"],["0","-b"]],"position":[["0","0"]],"clipSize":[["a","b"]],"radius":[["0","0","0","0"]],"src":["http://res.gezlife.com/resource/Imgs/uploads/model/201706/13/155995L/155995_UV_COS.jpg"],"realSize":[[8,8]],"type":"A","id":["B_157527_160621_157527"],"backupSrc":[[]],"model":["富之岛/富丽/450"],"matRotate":["0"],"bgRefSrc":"","reflexParameter":[""],"blurValue":["0.85"],"reflexMinQuality":[""],"reflexMidQuality":[""],"reflexMaxQuality":[""],"map_yy":[""],"map_gg":[""],"map_fx":[""],"map_zh":[""],"refSrc":[""],"chamferRanges":[[true,true,true,true]],"normals":[1],"method":"roll","rotation":"0","paveDetail":{"ifAngle":[false],"angleEdge":["5"],"ifPave":true,"paveType":"","paveData":{"paveWay":"roll","paveDire":"0","paveSize":"4"}},"rotCenter":{"x":0,"y":0},"lines":[0.03],"bgSrc":"common/images/color/c_cement.jpg?13","lineWidth":0.03};
             this.JSQEX_initialdata.materials.push(_obj);
             materials[i].map= THREE.ImageUtils.loadTexture(_obj.src,null,this.JSQEX_isPowerOfTwo.bind(this,i));
            } 
            if(this.JSQEX_object_type.utype){
                materials.push(
                    new THREE.MeshPhongMaterial()
                )
                var _obj=this.JSQEX_initialdata.materials[11]!=undefined?this.JSQEX_initialdata.materials[11]:{"mode":"mould","nValue":2,"nUnits":1,"map":[0],"value":[8,8],"cycle":[["a","0"],["0","b"],["-a","0"],["0","-b"]],"position":[["0","0"]],"clipSize":[["a","b"]],"radius":[["0","0","0","0"]],"src":["http://res.gezlife.com/resource/Imgs/uploads/model/201706/13/155995L/155995_UV_COS.jpg"],"realSize":[[8,8]],"type":"A","id":["B_157527_160621_157527"],"backupSrc":[[]],"model":["富之岛/富丽/450"],"matRotate":["0"],"bgRefSrc":"","reflexParameter":[""],"blurValue":["0.85"],"reflexMinQuality":[""],"reflexMidQuality":[""],"reflexMaxQuality":[""],"map_yy":[""],"map_gg":[""],"map_fx":[""],"map_zh":[""],"refSrc":[""],"chamferRanges":[[true,true,true,true]],"normals":[1],"method":"roll","rotation":"0","paveDetail":{"ifAngle":[false],"angleEdge":["5"],"ifPave":true,"paveType":"","paveData":{"paveWay":"roll","paveDire":"0","paveSize":"4"}},"rotCenter":{"x":0,"y":0},"lines":[0.03],"bgSrc":"common/images/color/c_cement.jpg?13","lineWidth":0.03};
                this.JSQEX_initialdata.materials.push(_obj);
                materials[11].map= THREE.ImageUtils.loadTexture(_obj.src,null,this.JSQEX_isPowerOfTwo.bind(this,11));
            }
        }
        this.JSQEX_stairsMaterial = new THREE.MultiMaterial( materials );
        if(!Added){
            this.JSQEX_parent.JSQEX_initialdataarr.push(this.JSQEX_initialdata);
        }
    }else{
        this.JSQEX_stairsMesh&&(this.JSQEX_stairsMesh.geometry.dispose(),this.JSQEX_container.remove(this.JSQEX_stairsMesh),this.JSQEX_stairsMesh=null);
    }
    this.JSQEX_Calculate_uv(this.JSQEX_object_type,null,true);
    for(var i=0,j=this.JSQEX_stairsMaterial.materials.length;i<j;i++){
        this.JSQEX_stairsMaterial.materials[i].map.repeat=new THREE.Vector2(this.JSQEX_Texturescale[i][0],this.JSQEX_Texturescale[i][1]);
    }
    this.JSQEX_stairsMesh = new THREE.Mesh( this.JSQEX_geom, this.JSQEX_stairsMaterial );
    this.JSQEX_stairsMesh.JSQEX_entity=this;
    this.JSQEX_stairsMesh.graphID=this.JSQEX_parent.graphID;
    // this.JSQEX_stairsMesh.JSQEX_Currentobjectindex=this.JSQEX_Currentobjectindex;
    this.JSQEX_stairsMesh.JSQEX_isStair=true;
    this.JSQEX_stairsMesh.children.forEach(function (e) {
            e.castShadow = true
    });
    this.JSQEX_container.add(this.JSQEX_stairsMesh);
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_initEdit_interface = function(json,Added) {//初始化楼梯对象
    var _lx=json.stairlx!=undefined?json.stairlx:1;
    if(_lx==1){//螺旋
        var Currentobject= new JSQEXBasicStructure.JSQEX_Stair_Spiral(json);
    }else if(_lx==2){//直线
        var Currentobject= new JSQEXBasicStructure.JSQEX_Stair_Beeline(json);
    }else if(_lx==3){//U型楼梯
        var Currentobject= new JSQEXBasicStructure.JSQEX_Stair_Utype(json);
    }else{//L型楼梯
        var Currentobject= new JSQEXBasicStructure.JSQEX_Stair_Ltype(json);
    }
    this.JSQEX_stairsMesh_arr.push(Currentobject);
    this.JSQEX_Currentobjectindex=Currentobject.ID;
    Currentobject.JSQEX_container=json.obj!=undefined?json.obj:scene;
    Currentobject.JSQEX_initialdata.stairlx=json.stairlx!=undefined?json.stairlx:1;
    Currentobject.JSQEX_initialdata.normal=json.normal!=undefined?json.normal:new THREE.Vector3(-1,0,0);
    Currentobject.JSQEX_initialdata.point=json.point!=undefined?json.point:new THREE.Vector3(11,30,5);
    Currentobject.JSQEX_initialdata.addgui=json.addgui!=undefined?json.addgui:false;
    // Currentobject.JSQEX_initialdata.length=json.length!=undefined?json.length:20;
    // Currentobject.JSQEX_initialdata.obj=json.obj!=undefined?json.obj:null;
    Currentobject.JSQEX_initialdata.materials=json.materials!=undefined?json.materials:[];
    Currentobject.JSQEX_initialdata.borderPoints=json.borderPoints;
    Currentobject.JSQEX_parent=this;
    Currentobject.JSQEX_getpoints(json,null,Added);
    Currentobject.JSQEX_initdata();
    Currentobject.JSQEX_limitwidth();
    Currentobject.JSQEX_drawstair(Added);
    json.addgui&&Currentobject.JSQEX_showgui();//显示楼梯对象的编辑区域
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_limitwidth = function(json,Added) {//楼梯宽度限制
    if(this.JSQEX_initialdata.borderPoints){
        var borderPoints1=this.JSQEX_initialdata.borderPoints[0].__proto__===THREE.Vector3.prototype?this.JSQEX_initialdata.borderPoints[0]:new THREE.Vector3(this.JSQEX_initialdata.borderPoints[0].x,this.JSQEX_initialdata.borderPoints[0].y,this.JSQEX_initialdata.borderPoints[0].z);
        var borderPoints2=this.JSQEX_initialdata.borderPoints[1].__proto__===THREE.Vector3.prototype?this.JSQEX_initialdata.borderPoints[1]:new THREE.Vector3(this.JSQEX_initialdata.borderPoints[1].x,this.JSQEX_initialdata.borderPoints[1].y,this.JSQEX_initialdata.borderPoints[1].z);
        this.JSQEX_limitwidthnum= Math.min(new THREE.Vector3().subVectors(borderPoints1,this.JSQEX_initialdata.point.clone().setY(borderPoints1.y)).length(),new THREE.Vector3().subVectors(borderPoints2,this.JSQEX_initialdata.point.clone().setY(borderPoints1.y)).length())
    }
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_getpoints = function(json,change,Added){//json.height:点击处距离上边的距离
    var _normal=json.normal!=undefined?json.normal.normalize():new THREE.Vector3(1,0,0);
    // var _length=json.length!=undefined?json.length:()json.layout.length?json.layout.length:15;
    var _height=json.height!=undefined?json.height:json.step.height!=undefined?json.step.height:json.point.y;
    var _point2=json.point!=undefined?json.point:new THREE.Vector3(0,10,0);
    var _length=15;
    if(json.length){
        _length=json.length;
    }else{
        if(json.layout.radius){
            _length=json.layout.radius;
        }
        if(json.layout.length){
            _length=json.layout.length;
        }
    }
    _point2=_point2.clone().setY(0);
    if(_normal.clone().cross(new THREE.Vector3(0,0,1)).length()==0){
        this.JSQEX_uvlx=3;
    }
    if(json.stairlx==1){
        this.tangent=this.JSQEX_Getnormal(_normal).multiplyScalar(this.JSQEX_pdnum);
        if(!Added){
            if(change){
                this.angle.aEndAngle+=Math.PI*this.JSQEX_pdnum;
                this.angle.aStartAngle=this.angle.aEndAngle-this.JSQEX_pdnum*this.layout.rotate*(Math.PI/180);
            }else{
                this.step.height=_height;
                this.angle.aStartAngle=this.tangent.z>0?Math.acos(this.tangent.clone().dot(new THREE.Vector3(1,0,0)))*-1:Math.acos(this.tangent.clone().dot(new THREE.Vector3(1,0,0)));
                this.angle.aEndAngle=this.angle.aStartAngle+this.JSQEX_pdnum*this.layout.rotate*(Math.PI/180);
            }
        }
        console.log(this.angle.aStartAngle*180/Math.PI,this.angle.aEndAngle*180/Math.PI)
        console.log(this.tangent)
        this.layout.radius=_length;
        this.center=_point2.clone().add(this.tangent.clone().multiplyScalar(_length));
        this.point1=_point2.clone();
        console.log(this.center)
    }else if(json.stairlx==2){
        this.point2=_point2;
        this.step.height=_height;
        this.layout.length=_length;
        this.point1=_point2.clone().add(_normal.clone().multiplyScalar(_length));
    }else if(json.stairlx==3){                  
        this.step.height=_height;
        this.layout.length1=json.layout&&json.layout.length1?json.layout.length1:_length;
        this.layout.height1=json.layout&&json.layout.height1?json.layout.height1:_height/2;
        this.layout.length2=json.layout&&json.layout.length2?json.layout.length2:_length;
        this.layout.height2=json.layout&&json.layout.height2?json.layout.height2:_height/2;
        this.point3=_point2.clone().add(_normal.clone().multiplyScalar(this.layout.length2));;
        this.point4=_point2.clone();
        this.point1=this.point3.clone().sub(_normal.clone().multiplyScalar(this.layout.length1));
        this.point2=this.point3.clone();
    }else{
        this.step.height=_height;
        this.layout.length2=json.layout&&json.layout.length2?json.layout.length2:_length;
        this.layout.length1=json.layout&&json.layout.length1?json.layout.length1:_length;;
        // var _point1=_point2.clone().add(_normal.clone().multiplyScalar(this.layout.length1));
        this.point3=_point2.clone().add(_normal.clone().multiplyScalar(this.layout.length2));
        this.point4=_point2;
        // this.layout.angle*=this.JSQEX_pdnum;
        this.ver1=new THREE.Vector3().subVectors(this.point1,this.point2).normalize();
    }
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_getRailingpoints = function(_json){//获取栏杆的组成点位置
    var Currentobjectindex=this.JSQEX_checkindex(this.JSQEX_Currentobjectindex);
    for(var i=0,ii=this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_armrest.length;i<ii;i++){
        for(var j=0,jj=this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_armrest[i].length;j<jj;j++){
            var geometry = new THREE.BoxGeometry( 1, 1, 1 );
            var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
            var cube1 = new THREE.Mesh( geometry, material );
            cube1.position.copy(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_armrest[i][j]);
            this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_container.add( cube1 );
        }
    }
    console.log(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_armrest[0]);
    console.log(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_armrest[1]);
    return this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_armrest;
}

JSQEXBasicStructure.JSQEX_Stair_Beeline = function(json) {
    JSQEXBasicStructure.JSQEX_Stair.call(this);
    this.Stair_child=true;
    this.JSQEX_initialdata.point1=this.point1=json.point1!=undefined?json.point1:new THREE.Vector3(0,0,0);
    this.JSQEX_initialdata.point2=this.point2=json.point2!=undefined?json.point2:new THREE.Vector3(10,0,0);
    this.JSQEX_initialdata.tjlx=this.tjlx=json.tjlx!=undefined?json.tjlx:{open:false,close:true,floor:false};//类型 open：开放式 close：闭合式 floor：落地式 true：添加
    this.JSQEX_initialdata.JSQEX_object_type=this.JSQEX_object_type=json.JSQEX_object_type!=undefined?json.JSQEX_object_type:{beelinetype:true,ltype:false,utype:false,spiraltype:false};
    this.JSQEX_initialdata.addgeo=this.addgeo=json.addgeo!=undefined?json.addgeo:{side_string:false,support_beam:false};//生成几何体 side_string:侧弦 support_beam：支撑梁   true：添加
    this.JSQEX_initialdata.layout=this.layout=json.layout!=undefined?json.layout:{length:20,width1:12,width2:12};//布局 length:长度,width:宽度
    this.JSQEX_initialdata.step=this.step=json.step!=undefined?json.step:{height:1};//梯级 height:高度
    this.JSQEX_initialdata.steps=this.steps=json.steps!=undefined?json.steps:{thickness:.8,depth:.0,subsection:12};//台阶  thickness:厚度,depth:深度,subscction:分段数
    this.mrsteps={thickness:.8,depth:.0,subsection:12};
    this.JSQEX_initialdata.support_beam=this.support_beam=json.support_beam!=undefined?json.support_beam:{depth:3.2,width:2}; //支撑梁 depth:深度,width:宽度
    this.mrsupport_beam={depth:3.2,width:2};
    this.JSQEX_initialdata.side_string=this.side_string=json.side_string!=undefined?json.side_string:{depth:4.0,width:.8,offset:0}//侧弦 depth:深度,width:宽度,offset:偏移

}
JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype = Object.create( JSQEXBasicStructure.JSQEX_Stair.prototype );
JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype.constructor = JSQEXBasicStructure.JSQEX_Stair_Beeline;

JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype.JSQEX_showgui = function(json) {
    var scope=this;
    var object_type=scope.JSQEX_object_type;
    var tjlx=scope.tjlx;
    var addgeo=scope.addgeo;
    var layout=scope.layout;
    var step=scope.step;
    var steps=scope.steps
    var support_beam=scope.support_beam
    var side_string=scope.side_string;
    var params = {
            开放式: tjlx.open,
            封闭式: tjlx.close,
            落地式: tjlx.floor,
            侧弦:   addgeo.side_string,
            支撑梁: addgeo.support_beam,
            长度:   layout.length,
            宽度1:   layout.width1,
            宽度2:   layout.width2,
            高度:   step.height, 
            厚度:   steps.thickness,
            深度:   steps.depth,
            分段:   steps.subsection,
            深度_支:support_beam.depth,
            宽度_支:support_beam.width,
            宽度_侧:side_string.width,
            深度_侧:side_string.depth,
            偏移_侧:side_string.offset,
        };
    var gui = new dat.GUI( { width: 200 } );
    var folderGeometry = gui.addFolder( '类型' );
    folderGeometry.add( params, '开放式').onChange( function(val) {

    } );
    folderGeometry.add( params, '封闭式').onChange( function(val) {
 
    } );
    folderGeometry.add( params, '落地式').onChange( function(val) {
    } );
    // folderGeometry.open();
    var folderCamera = gui.addFolder( '生成几何体' );
    folderCamera.add( params, '侧弦').onChange( function(val) {
       scope.addgeo.side_string=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.add( params, '支撑梁').onChange( function(val) {
       scope.addgeo.support_beam=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.open();
    var folderCamera = gui.addFolder( '梯级' );
    folderCamera.add( params, '高度',1, 80, 1).onChange( function(val) {
       scope.step.height=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '布局' );
    folderCamera.add( params, '长度',1, 100, 1).onChange( function(val) {
       scope.layout.length=val;
       scope.point1.copy(new THREE.Vector3().subVectors(scope.point1,scope.point2).normalize().multiplyScalar(val).add(scope.point2));
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '宽度1',0, 50, 1).onChange( function(val) {
       scope.layout.width1=val;
       scope.JSQEX_drawstair()
    } );
     folderCamera.add( params, '宽度2',0, 50, 1).onChange( function(val) {
       scope.layout.width2=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.open();
    var folderCamera = gui.addFolder( '台阶' );
    folderCamera.add( params, '厚度',0.01, 5.12, 0.01).onChange( function(val) {
       scope.steps.thickness=val;
       scope.mrsteps.thickness=val;
       scope.JSQEX_drawstair()

    } );
    folderCamera.add( params, '深度',0, 15, 0.1).onChange( function(val) {
       scope.steps.depth=val;
       scope.mrsteps.depth=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '分段',1, 50, 1).onChange( function(val) {
       scope.steps.subsection=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '支撑梁' );
    folderCamera.add( params, '深度_支',0, 80, .1).onChange( function(val) {
        if(scope.addgeo.support_beam){
            scope.support_beam.depth=val;
            scope.mrsupport_beam.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_支',10, 15, .1).onChange( function(val) {
        if(scope.addgeo.support_beam){ 
            scope.support_beam.width=val;
            scope.mrsupport_beam.width=val;
            scope.JSQEX_drawstair()
        }
    } );
    var folderCamera = gui.addFolder( '侧弦' );
    folderCamera.add( params, '深度_侧',.5, 15, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_侧',0.05, 5, .01).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.width=val;
            scope.JSQEX_drawstair()
        }   
    } );
    folderCamera.add( params, '偏移_侧',0, 12, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.offset=val;
            scope.JSQEX_drawstair()
        }
    } );
}

JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype.JSQEX_getpoints1 = function(_json){
    if(this.JSQEX_limitwidthnum&&this.layout.width2/2>this.JSQEX_limitwidthnum){
        this.layout.width2=this.JSQEX_limitwidthnum*2;
        console.log("超出地台边界！")
    }
    var _num=this.steps.subsection;
    var object_type=this.JSQEX_object_type;
    var tjlx=this.tjlx;//类型 
    var addgeo=this.addgeo;
    var layout=this.layout;
    var step=this.step;
    var steps=this.steps
    var support_beam=this.support_beam
    var side_string=this.side_string
    var arr=[];
    var point1=this.point1;
    var point2=this.point2;
    for (var i = 0; i<=_num; i ++ ) {
        arr.push( this.JSQEX_getpoints2(point1,point2,i,_num) );
    }
    return {arr:arr,num:_num,tjlx:tjlx,object_type:object_type,addgeo:addgeo,layout:layout,step:step,steps:steps,support_beam:support_beam,side_string:side_string};
}

JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype.JSQEX_getpoints2 = function(point1,point2,index,num){
    var fxver=new THREE.Vector3().copy(point2).sub(point1).normalize();
    var perlength=new THREE.Vector3().copy(point2).sub(point1).length()/num;
    return new THREE.Vector3().copy(point1.clone().add(fxver.multiplyScalar(perlength*index))); 
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_drawstair = function(Added) {
    if(this.__proto__===JSQEXBasicStructure.JSQEX_Stair.prototype){
        if(this.JSQEX_stairsMesh_arr.length>0){
            for(var i=0,j=this.JSQEX_initialdata.length;i<j;i++){
              this.JSQEX_stairsMesh_arr[i].JSQEX_drawstair(true);
            }
        }else{
            for(var i=0,j=this.JSQEX_initialdataarr.length;i<j;i++){
                this.JSQEX_initEdit_interface(this.JSQEX_initialdataarr[i],Added);
            }
        }
    }else{
        var _json=this.JSQEX_getpoints1();
        if(_json.step.height<0){
            _json.step.height*=-1;//默认只能大于等于0
        }
        this.JSQEX_armrest=[[],[],[],[],[]];
        this.JSQEX_dispose(); 
        this.JSQEX_Spiralstair(_json);
        this.JSQEX_AddStair(Added);
    }
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_draw = function(json) {
    this.JSQEX_drawstair(true); 
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_initdata = function(json) {
    if(this.tjlx.close||this.tjlx.floor){
        this.mrsteps.thickness=this.steps.thickness=this.step.height/this.steps.subsection;
        this.mrsteps.depth=this.steps.depth=0;
        this.mrsupport_beam.depth=this.support_beam.depth=(this.tjlx.close?(this.step.height/(this.steps.subsection+(this.JSQEX_object_type.ltype||this.JSQEX_object_type.utype?1:0))):this.step.height);
        this.mrsupport_beam.width=this.support_beam.width=this.layout.width||this.layout.width1;
    }
}   

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_changetjlx = function(json) {//open：开放式 close：闭合式 floor：落地式 true：修改
    var Currentobjectindex=this.JSQEX_checkindex(this.JSQEX_Currentobjectindex);
    if(json.open){
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.open=json.open;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.close=false;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.floor=false;
    }
    if(json.close){
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.close=json.close;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.open=false;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.floor=false;
    }
    if(json.floor){
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.floor=json.floor;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.close=false;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].tjlx.open=false;
    }
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_drawstair()
}

// JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_changestairlx = function(lxnum) {//lxnum 1:螺旋楼梯 2:直线楼梯 3:U型楼梯 4:L型楼梯
//     if(this.JSQEX_initialdata.stairlx==lxnum){
//         console.log(this.JSQEX_initialdata.stairlx);
//         return;
//     }
//     this.JSQEX_stairsMesh_arr[this.JSQEX_Currentobjectindex-1].JSQEX_stairsMesh&&(this.JSQEX_stairsMesh_arr[this.JSQEX_Currentobjectindex-1].JSQEX_stairsMesh.geometry.dispose(),
//     this.JSQEX_stairsMesh_arr[this.JSQEX_Currentobjectindex-1].JSQEX_container.remove(this.JSQEX_stairsMesh_arr[this.JSQEX_Currentobjectindex-1].JSQEX_stairsMesh),
//     this.JSQEX_stairsMesh_arr[this.JSQEX_Currentobjectindex-1].JSQEX_stairsMesh=null)
//     this.JSQEX_initialdata.stairlx=lxnum;
//     this.JSQEX_initEdit_interface(this.JSQEX_initialdata);
// }

JSQEXBasicStructure.JSQEX_Stair_Spiral = function(json) {
    JSQEXBasicStructure.JSQEX_Stair.apply(this);
    this.Stair_child=true;
    this.center=json.center!=undefined?json.center:new THREE.Vector3(0,0,0);
    this.point1=json.point1!=undefined?json.point1:new THREE.Vector3(0,0,0);
    this.JSQEX_initialdata.angle=this.angle=json.angle!=undefined?json.angle:{aStartAngle:.5*Math.PI,aEndAngle:.5*Math.PI+1*Math.PI}
    this.JSQEX_initialdata.tangent=this.tangent=json.tangent!=undefined?json.tangent:new THREE.Vector3(0,0,-1);
    this.JSQEX_initialdata.normal=this.JSQEX_initialdata.normal=json.normal;//空间点的法线
    this.circlenormal=json.circlenormal!=undefined?json.circlenormal:new THREE.Vector3(0,1,0);//圆的法线
    this.JSQEX_initialdata.tjlx=this.tjlx=json.tjlx!=undefined?json.tjlx:{open:false,close:true,floor:false};//类型 open：开放式 close：闭合式 floor：落地式 true：添加
    this.JSQEX_initialdata.JSQEX_object_type=this.JSQEX_object_type=json.JSQEX_object_type!=undefined?json.JSQEX_object_type:{beelinetype:false,ltype:false,utype:false,spiraltype:true};
    this.JSQEX_initialdata.addgeo=this.addgeo=json.addgeo!=undefined?json.addgeo:{side_string:false,support_beam:false,cylinder:false};//生成几何体 side_string:侧弦 support_beam：支撑梁   true：添加
    this.JSQEX_initialdata.layout=this.layout=json.layout!=undefined?json.layout:{radius:15,rotate:180,width:12};//布局 radius:半径,rotate:旋转,width:宽度
    this.JSQEX_initialdata.step=this.step=json.step!=undefined?json.step:{height:1000};//梯级 height:高度
    this.JSQEX_initialdata.steps=this.steps=json.steps!=undefined?json.steps:{thickness:.8,depth:0,subsection:12};//台阶  thickness:厚度,depth:深度,subscction:分段数
    this.mrsteps={thickness:.12,depth:0,subsection:12};
    this.JSQEX_initialdata.support_beam=this.support_beam=json.support_beam!=undefined?json.support_beam:{depth:3.2,width:2}; //支撑梁 depth:深度,width:宽度
    this.mrsupport_beam={depth:3.2,width:2};
    this.JSQEX_initialdata.side_string=this.side_string=json.side_string!=undefined?json.side_string:{depth:4,width:.8,offset:0}//侧弦 depth:深度,width:宽度,offset:偏移 
    this.uvp1,this.uvp2,this.uvp3,this.uvp4;
    this.uvbottom_sup;
    this.uvbottom_side;
}
JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype = Object.create( JSQEXBasicStructure.JSQEX_Stair.prototype );
JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype.constructor = JSQEXBasicStructure.JSQEX_Stair_Spiral;

JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype.JSQEX_showgui = function(json) {
    var scope=this;
    var object_type=scope.JSQEX_object_type;
    var tjlx=scope.tjlx;
    var addgeo=scope.addgeo;
    var layout=scope.layout;
    var step=scope.step;
    var steps=scope.steps
    var support_beam=scope.support_beam
    var side_string=scope.side_string;
    var params = {
            开放式: tjlx.open,
            封闭式: tjlx.close,
            落地式: tjlx.floor,
            侧弦:   addgeo.side_string,
            支撑梁: addgeo.support_beam,
            中柱:   addgeo.cylinder,
            高度:   step.height,
            半径:   layout.radius,
            旋转:   layout.rotate,
            宽度:   layout.width,
            厚度:   steps.thickness,
            深度:   steps.depth,
            分段:   steps.subsection,
            深度_支:support_beam.depth,
            宽度_支:support_beam.width,
            宽度_侧:side_string.width,
            深度_侧:side_string.depth,
            偏移_侧:side_string.offset,
        };
    var gui = new dat.GUI( { width: 200 } );
    var folderGeometry = gui.addFolder( '类型' );
    folderGeometry.add( params, '开放式').onChange( function(val) {

    } );
    folderGeometry.add( params, '封闭式').onChange( function(val) {
 
    } );
    folderGeometry.add( params, '落地式').onChange( function(val) {
    } );
    var folderCamera = gui.addFolder( '生成几何体' );
    folderCamera.add( params, '侧弦').onChange( function(val) {
       scope.addgeo.side_string=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.add( params, '支撑梁').onChange( function(val) {
       scope.addgeo.support_beam=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.open();
    var folderCamera = gui.addFolder( '梯级' );
    folderCamera.add( params, '高度',1, 80, 1).onChange( function(val) {
       scope.step.height=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '布局' );
    folderCamera.add( params, '半径',5, 50, 1).onChange( function(val) {
       scope.layout.radius=val;
       scope.center=scope.point1.clone().add(scope.tangent.clone().multiplyScalar(val));
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '旋转',30, 1080, 1).onChange( function(val) {
       scope.angle.aStartAngle=scope.angle.aEndAngle-val*(Math.PI/180)*scope.JSQEX_pdnum;
       scope.layout.rotate=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '宽度',1, 50, 1).onChange( function(val) {
       scope.layout.width=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.open();
    var folderCamera = gui.addFolder( '台阶' );
    folderCamera.add( params, '厚度',0.01, 5, 0.01).onChange( function(val) {
       scope.steps.thickness=val;
       scope.mrsteps.thickness=val;
       scope.JSQEX_drawstair()

    } );
    folderCamera.add( params, '深度',0, 10, 0.01).onChange( function(val) {
       scope.steps.depth=val;
       scope.mrsteps.depth=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '分段',3, 100, 1).onChange( function(val) {
       scope.steps.subsection=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '支撑梁' );
    folderCamera.add( params, '深度_支',0, 8000, 1).onChange( function(val) {
        if(scope.addgeo.support_beam){
            scope.support_beam.depth=val;
            scope.mrsupport_beam.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_支',1, 50, 1).onChange( function(val) {
        if(scope.addgeo.support_beam){ 
            scope.support_beam.width=val;
            scope.mrsupport_beam.width=val;
            scope.JSQEX_drawstair()
        }
    } );
    var folderCamera = gui.addFolder( '侧弦' );
    folderCamera.add( params, '深度_侧',.5, 10, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_侧',.5, 5, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.width=val;
            scope.JSQEX_drawstair()
        }   
    } );
    folderCamera.add( params, '偏移_侧',0, 12, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.offset=val;
            scope.JSQEX_drawstair()
        }
    } );
}

JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype.JSQEX_getpoints1 = function(){
    if(this.JSQEX_limitwidthnum&&this.layout.width/2>this.JSQEX_limitwidthnum){
        this.layout.width=this.JSQEX_limitwidthnum*2;
        console.log("超出地台边界！")
    }
    var _center=this.center;
    var _radius=this.layout.radius
    var _aStartAngle=this.angle.aStartAngle;
    var _aEndAngle=this.angle.aEndAngle;
    var normal=this.circlenormal;
    var _num=this.steps.subsection;
    var perradian=(_aEndAngle-_aStartAngle)/_num;
    var pdwidth=this.layout.width>_radius?(_radius):this.layout.width||400;
    var object_type=this.JSQEX_object_type;
    var tjlx=this.tjlx;//类型 
    var addgeo=this.addgeo;//生成几何体 0:侧弦 1：支撑梁 2：中柱  true：添加
    var layout=this.layout;//布局 radius:半径,rotate:旋转,width:宽度
    var step=this.step;//梯级
    var steps=this.steps//台阶  thickness:厚度,depth:深度 subsection:分段
    var support_beam=this.support_beam//支撑梁 depth:深度,width:宽度
    var side_string=this.side_string //侧弦 depth:深度,width:宽度,offset:偏移
    var arr=[];
    for ( x = 0; x <= _num; x ++ ) {
        arr.push( this.JSQEX_getpoints2(_center,normal,_radius,_aStartAngle+x *perradian) );
    }
    return {center:_center,arr:arr,num:_num,tjlx:tjlx,object_type:object_type,addgeo:addgeo,layout:layout,step:step,steps:steps,support_beam:support_beam,side_string:side_string};
}

JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype.JSQEX_getpoints2 = function(center,normal,radius,radian) { //通过圆心 法向量 半径 弧度值 计算3d空间中圆上点的位置坐标
    var ver1 = new THREE.Vector3(normal.y, -normal.x, 0.0).normalize();
    var ver2 = new THREE.Vector3(normal.x * normal.z, normal.y * normal.z, -(normal.x * normal.x + normal.y  
            * normal.y)).normalize();
    if(normal.clone().cross(new THREE.Vector3(0,0,1)).length()==0){
        ver1=  new THREE.Vector3(normal.z, 0, -normal.x).normalize();
        ver2 = new THREE.Vector3().copy(normal).cross(ver1).normalize();
    }  
    var x = center.x + radius * (ver1.x * Math.cos(radian) + ver2.x * Math.sin(radian));  
    var y = center.y + radius * (ver1.y * Math.cos(radian) + ver2.y * Math.sin(radian));  
    var z = center.z + radius * (ver1.z * Math.cos(radian) + ver2.z * Math.sin(radian));  
    return new THREE.Vector3(x, y, z);
}

JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype.JSQEX_Spiralstair = function(json){
    if(this.tjlx.close||this.tjlx.floor){
        this.steps.thickness=this.step.height/this.steps.subsection;
        this.steps.depth=0;
    }else{
        this.steps.thickness=this.mrsteps.thickness;
        this.steps.depth=this.mrsteps.depth;
    }
    var arr=json.arr;
    for(var i=0,j=arr.length-1;i<j;i++){
        var fxver=new THREE.Vector3().subVectors(arr[i],arr[i+1]);
        var ver1=arr[i+1].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar(this.layout.width/2*this.JSQEX_pdnum).add(arr[i+1].clone()).add(new THREE.Vector3(0,this.step.height/this.steps.subsection*(i+1),0)); 
        var ver2=arr[i+1].clone().sub(json.center).normalize().multiplyScalar(this.layout.width/2*this.JSQEX_pdnum).add(arr[i+1].clone()).add(new THREE.Vector3(0,this.step.height/this.steps.subsection*(i+1),0));
        var ver3=arr[i].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar(this.layout.width/2*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,this.step.height/this.steps.subsection*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(this.steps.depth));
        var ver4=arr[i].clone().sub(json.center).normalize().multiplyScalar(this.layout.width/2*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,this.step.height/this.steps.subsection*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(this.steps.depth));
        var ver5=ver1.clone().sub(new THREE.Vector3(0,this.steps.thickness,0)); 
        var ver6=ver2.clone().sub(new THREE.Vector3(0,this.steps.thickness,0));
        var ver7=ver3.clone().sub(new THREE.Vector3(0,this.steps.thickness,0));
        var ver8=ver4.clone().sub(new THREE.Vector3(0,this.steps.thickness,0));
        var _fxver=new THREE.Vector3().subVectors(ver2,ver4);
        var _normal=this.JSQEX_Getnormal(_fxver);
        if(this.JSQEX_pdnum>0){//设置uv坐标范围
            this.uvp1=ver2.clone().add(_normal.clone().multiplyScalar(new THREE.Vector3().subVectors(ver2,ver1).dot(_normal.multiplyScalar(-1))));
            this.uvp2=ver2;
            this.uvp3=ver4.clone().add(_normal.clone().multiplyScalar(new THREE.Vector3().subVectors(ver2,ver1).dot(_normal.multiplyScalar(-1))));
            this.uvp4=ver4;
        }else{
            this.uvp1=ver1;
            this.uvp2=ver1.clone().add(_normal.clone().multiplyScalar(-1).multiplyScalar(new THREE.Vector3().subVectors(ver2,ver1).dot(_normal.multiplyScalar(-1))));
            this.uvp3=ver3;
            this.uvp4=ver3.clone().add(_normal.clone().multiplyScalar(-1).multiplyScalar(new THREE.Vector3().subVectors(ver2,ver1).dot(_normal.multiplyScalar(-1))));
        }
        
        this.JSQEX_vertices.push(
            ver1,ver2,ver3,ver4,ver5,ver6,ver7,ver8
        )
        if(!json.addgeo.side_string){
            var _offsetl_r=this.layout.width/2;
            this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(_normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
            this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(_normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
            if(i==j-1||i==0){
                this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(_normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
                this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(_normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
            }
        }
        if(i==j-1){
            this.JSQEX_jdpoints=[];
            this.JSQEX_jdpoints.push(ver1,ver2);
        }
        //上面
        var min_max1={point1:this.uvp1,point2:this.uvp2,point3:this.uvp3,point4:this.uvp4};
        var _arr=[
            [0+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
            [2+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_max1,materialInd:0});
        //上面
        if(json.tjlx.open){
            var _arr=[
                [5+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum]//下面
            ]
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_max1,materialInd:0});
            var _arr=[    
                [0+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum],
                [4+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum]//左面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:2,scale:this.JSQEX_pdnum==1?new THREE.Vector2(new THREE.Vector3().subVectors(ver1,ver3).length()/new THREE.Vector3().subVectors(ver2,ver4).length(),1):undefined});
            var _arr=[ 
                [3+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum],
                [7+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum]//右面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:2,scale:this.JSQEX_pdnum==-1?new THREE.Vector2(new THREE.Vector3().subVectors(ver2,ver4).length()/new THREE.Vector3().subVectors(ver1,ver3).length(),1):undefined});
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],//前面
                [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum],
                [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum]//后面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1});
        }
        if(json.tjlx.close||json.tjlx.floor){
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum]//前面
            ] 
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1}); 
        }
        this.JSQEX_verticesnum+=8;
    }
    if(json.addgeo.support_beam||!json.tjlx.open){//判断是否显示支持梁
        this.JSQEX_Addsupport_beam(json);
    }
    if(json.addgeo.side_string){//判断是否显示侧弦
        this.JSQEX_armrest[0]=[];
        this.JSQEX_armrest[1]=[];
        this.JSQEX_armrest[2]=[];
        this.JSQEX_armrest[3]=[];
        this.JSQEX_Addside_string(json);
    }
}

JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype.JSQEX_Addsupport_beam = function(json){
    var min_maxB,Cal_vertice=[],pdBottom=[];
    var arr=json.arr;
    var tjhd=this.steps.thickness;
    var allheight=this.step.height;
    var overdistance=this.steps.depth;
    var zclheight=this.support_beam.depth;
    var pdwidth=this.layout.width/2;
    var perheight=allheight/this.steps.subsection;
    var pdyval=0;
    var _widthzcl=this.support_beam.width/2;
    if(this.tjlx.close||this.tjlx.floor){
        tjhd=0;
        _widthzcl=pdwidth;
        zclheight=perheight-tjhd;
        this.support_beam.depth=zclheight;
        this.support_beam.width=_widthzcl*2;
    }else{
        tjhd=this.mrsteps.thickness;
        overdistance=this.mrsteps.depth;
        this.support_beam.depth=this.mrsupport_beam.depth;
        this.support_beam.width=this.mrsupport_beam.width;
        _widthzcl=this.mrsupport_beam.width/2;
        zclheight=this.support_beam.depth;
    }
    if(this.tjlx.floor){
        zclheight=allheight;

     }
    var fxver=new THREE.Vector3().subVectors(arr[0],arr[1]);
    var normal=this.JSQEX_Getnormal(fxver);
    for(var i=0,j=arr.length-1;i<j;i++){
        var ver_1=null,ver_2=null,ver_3=null,ver_4=null,ver_5=null,ver_6=null,ver_7=null,ver_8=null,ver_9=null,ver_10=null;
        ver_1=arr[i+1].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar(_widthzcl*this.JSQEX_pdnum).add(arr[i+1].clone()).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0)); 
        ver_2=arr[i+1].clone().sub(json.center).normalize().multiplyScalar(_widthzcl*this.JSQEX_pdnum).add(arr[i+1].clone()).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
        ver_3=arr[i].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar(_widthzcl*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
        ver_4=arr[i].clone().sub(json.center).normalize().multiplyScalar(_widthzcl*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
        ver_5=ver_1.clone().sub(new THREE.Vector3(0,zclheight,0)); 
        ver_6=ver_2.clone().sub(new THREE.Vector3(0,zclheight,0));
        ver_7=ver_3.clone().sub(new THREE.Vector3(0,i==0?perheight-tjhd:perheight+zclheight,0));
        ver_8=ver_4.clone().sub(new THREE.Vector3(0,i==0?perheight-tjhd:perheight+zclheight,0));
        var _arr=[ver_1,ver_2,ver_3,ver_4,ver_5,ver_6,ver_7,ver_8];
        this.JSQEX_pdyval(_arr,pdyval);
        this.JSQEX_vertices.push(
            ver_1,ver_2,ver_3,ver_4,ver_5,ver_6,ver_7,ver_8
        )
        pdBottom.push(ver_5,ver_6,ver_7,ver_8);
        Cal_vertice.push([ver_1,ver_2,ver_3,ver_4,ver_5,ver_6,ver_7,ver_8,ver_9,ver_10]);
    }
    min_maxB=this.JSQEX_computeBoundingBox(pdBottom);
    this.uvbottom_sup=min_maxB;
    // var _pdheight=perheight+zclheight>this.step.height?this.step.height:perheight+zclheight;
    var _pdheight=perheight+zclheight>this.step.height-tjhd?this.step.height-tjhd:perheight+zclheight;
    for(var i=0;i<Cal_vertice.length;i++){
        if(i==j-1){//最后一阶后面
            var _arr=[
                [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum],
                [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum]
            ]
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            // this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:4});  
        }
        //左面
        var _arr=[
            [0+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
            [4+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:4,materialInd:5,arr:_arr,index:i,num:j,uvlx:2,height:allheight-tjhd,side:1,scale:this.JSQEX_pdnum==1?new THREE.Vector2((this.layout.radius-this.support_beam.width/2)/(this.layout.radius+this.support_beam.width/2),1):undefined});
        //左面
        //右面
        var _arr=[
            [3+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
            [7+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:4,materialInd:5,arr:_arr,index:i,num:j,uvlx:2,height:allheight-tjhd,side:2,scale:this.JSQEX_pdnum==-1?new THREE.Vector2((this.layout.radius-this.support_beam.width/2)/(this.layout.radius+this.support_beam.width/2),1):undefined});
        //右面
        //下面
        var _arr=[
            [6+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum],
            [4+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxB,min_max2:min_maxB,materialInd:3,uvlx:2});
        //下面
        //开放状态 则添加前面
        if(json.tjlx.open){
             var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum]
            ]
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            // this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:4});
        }
        //开放状态 则添加前面    
        this.JSQEX_verticesnum+=8;  
    }
}

JSQEXBasicStructure.JSQEX_Stair_Spiral.prototype.JSQEX_Addside_string = function(json){
    var min_maxB1,min_maxT1,min_maxB2,min_maxT2,Cal_vertice=[],pdBottom1=[],pdTop1=[],pdBottom2=[],pdTop2=[];
    var arr=json.arr;
    var tjhd=json.steps.thickness;
    var allheight=json.step.height;
    var overdistance=json.steps.depth;
    var cxwidth=json.side_string.width;
    var zclheight=json.support_beam.depth;
    var pdwidth=json.layout.width/2;
    var sidehd2=json.side_string.depth;
    var perheight=allheight/json.steps.subsection;
    var _offset=json.layout.offset;
    var pdyval=0;
    var _widthzcl=json.support_beam.width/2;
    for(var i=0,j=arr.length-1;i<j;i++){
        var fxver=new THREE.Vector3().subVectors(arr[i],arr[i+1]);
         //侧弦实现
        var _num=i+1;
        var _cxpynum=new THREE.Vector3(0,1,0).multiplyScalar(json.side_string.offset);
        var normal=this.JSQEX_Getnormal(fxver);
        var v1=null,v2=null,v3=null,v4=null,v5=null,v6=null,v7=null,v8=null,v9=null,v10=null,v11=null,v12=null,v13=null,v14=null,v15=null,v16=null;
        //左边栏上面
        v1=arr[_num].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar((pdwidth+cxwidth)*this.JSQEX_pdnum).add(arr[_num].clone()).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        v2=arr[_num].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar(pdwidth*this.JSQEX_pdnum).add(arr[_num].clone()).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        v3=arr[i].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar((pdwidth+cxwidth)*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        v4=arr[i].clone().sub(json.center).multiplyScalar(-1).normalize().multiplyScalar(pdwidth*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        //右边栏上面
        v5=arr[_num].clone().sub(json.center).normalize().multiplyScalar(pdwidth*this.JSQEX_pdnum).add(arr[_num].clone()).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        v6=arr[_num].clone().sub(json.center).normalize().multiplyScalar((pdwidth+cxwidth)*this.JSQEX_pdnum).add(arr[_num].clone()).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        v7=arr[i].clone().sub(json.center).normalize().multiplyScalar(pdwidth*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        v8=arr[i].clone().sub(json.center).normalize().multiplyScalar((pdwidth+cxwidth)*this.JSQEX_pdnum).add(arr[i].clone()).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        //左边栏下面
        v9=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v1.clone());
        v10=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v2.clone());
        v11=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v3.clone());;
        v12=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v4.clone());
        //右边栏下面
        v13=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v5.clone());
        v14=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v6.clone());
        v15=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v7.clone());;
        v16=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v8.clone());
        // this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(v3,v4).multiplyScalar(.5),new THREE.Vector3().addVectors(v1,v2).multiplyScalar(.5));
        // this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(v7,v8).multiplyScalar(.5),new THREE.Vector3().addVectors(v5,v6).multiplyScalar(.5));
        // if(i==j-1||i==0){
        //     this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v3,v4).multiplyScalar(.5),new THREE.Vector3().addVectors(v1,v2).multiplyScalar(.5));
        //     this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v7,v8).multiplyScalar(.5),new THREE.Vector3().addVectors(v5,v6).multiplyScalar(.5));
        // }
        var _offsetl_r=cxwidth;
        this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
        this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
        if(i==j-1||i==0){
            this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
            this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
        }
        var _arr=[v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16];
        this.JSQEX_pdyval(_arr,pdyval);
        this.JSQEX_vertices.push(
            v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16
        )
        pdTop1.push(v1,v2,v3,v4);
        pdBottom1.push(v9,v10,v11,v12);
        pdTop2.push(v5,v6,v7,v8);
        pdBottom2.push(v13,v14,v15,v16);
        Cal_vertice.push([v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16]);
        if(i==j-1){
            this.JSQEX_jdpoints=[];
            this.JSQEX_jdpoints.push(v1,v6);
        }
    }
    min_maxB1=this.JSQEX_computeBoundingBox(pdBottom1);
    min_maxT1=this.JSQEX_computeBoundingBox(pdTop1);
    min_maxB2=this.JSQEX_computeBoundingBox(pdBottom2);
    min_maxT2=this.JSQEX_computeBoundingBox(pdTop2);
    this.uvbottom_side=min_maxB2;
    var _scale=new THREE.Vector2((min_maxT1.max.x-min_maxT1.min.x)/(min_maxB2.max.x-min_maxB2.min.x),(min_maxT1.max.z-min_maxT1.min.z)/(min_maxB2.max.z-min_maxB2.min.z))
    for(var i=0;i<Cal_vertice.length;i++){
        if(i==0){
            var _arr=[
                [2+ this.JSQEX_verticesnum, 10+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum],
                [10+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
            var _arr=[
                [6+ this.JSQEX_verticesnum, 14+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum],
                [14+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
        }
        if(i==j-1){
            var _arr=[
                [1+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum,0+ this.JSQEX_verticesnum],
                [9+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,0+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
            var _arr=[
                [5+ this.JSQEX_verticesnum, 13+ this.JSQEX_verticesnum,4+ this.JSQEX_verticesnum],
                [13+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,4+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
        }
        //左上
        var _arr=[
            [0+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
            [2+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxT1,min_max2:min_maxT1,materialInd:6,uvlx:2,scale:_scale});
        //右上
        var _arr=[
            [4+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
            [6+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxT2,min_max2:min_maxT2,materialInd:6,uvlx:2});
        //左下
        var _arr=[
            [10+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum],
            [8+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxB1,min_max2:min_maxB1,materialInd:6,uvlx:2,scale:_scale});
        //左左
        var _arr=[
            [0+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum],
            [8+ this.JSQEX_verticesnum,10+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:4,materialInd:8,arr:_arr,index:i,num:j,uvlx:2,height:allheight+perheight+json.side_string.offset,side:1,scale:this.JSQEX_pdnum==1?new THREE.Vector2((this.layout.radius-this.layout.width/2-this.side_string.width)/(this.layout.radius+this.layout.width/2+this.side_string.width),1):undefined});
        //左右
        var _arr=[
            [3+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
            [11+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:4,materialInd:8,arr:_arr,index:i,num:j,uvlx:2,height:allheight+perheight+json.side_string.offset,side:2,scale:this.JSQEX_pdnum==1?new THREE.Vector2((this.layout.radius-this.layout.width/2)/(this.layout.radius+this.layout.width/2+this.side_string.width),1):new THREE.Vector2((this.layout.radius+this.layout.width/2)/(this.layout.radius+this.layout.width/2+this.side_string.width),1)});
        //右下
        var _arr=[
            [14+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum],
            [12+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxB2,min_max2:min_maxB2,materialInd:6,uvlx:2});
        //右左
        var _arr=[
            [4+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum],
            [12+ this.JSQEX_verticesnum,14+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:4,materialInd:8,arr:_arr,index:i,num:j,uvlx:2,height:allheight+perheight+json.side_string.offset,side:1,scale:this.JSQEX_pdnum==1?new THREE.Vector2((this.layout.radius+this.layout.width/2)/(this.layout.radius+this.layout.width/2+this.side_string.width),1):new THREE.Vector2((this.layout.radius-this.layout.width/2)/(this.layout.radius+this.layout.width/2+this.side_string.width),1)});
        //右右
        var _arr=[
            [7+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
            [15+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:4,materialInd:8,arr:_arr,index:i,num:j,uvlx:2,height:allheight+perheight+json.side_string.offset,side:2,scale:this.JSQEX_pdnum==-1?new THREE.Vector2((this.layout.radius-this.layout.width/2-this.side_string.width)/(this.layout.radius+this.layout.width/2+this.side_string.width),1):undefined});
        this.JSQEX_verticesnum+=16;
    }
}

JSQEXBasicStructure.JSQEX_Stair_Utype = function(json) {
    JSQEXBasicStructure.JSQEX_Stair.call(this);
    this.Stair_child=true;
    this.point1=new THREE.Vector3(0,0,0);
    this.point2=new THREE.Vector3(0,0,0);
    this.point3=new THREE.Vector3(0,0,0);
    this.point4=new THREE.Vector3(0,0,0);
    this.JSQEX_initialdata.tjlx=this.tjlx=json.tjlx!=undefined?json.tjlx:{open:false,close:true,floor:false};//类型 open：开放式 close：闭合式 floor：落地式 true：添加
    this.JSQEX_initialdata.JSQEX_object_type=this.JSQEX_object_type=json.JSQEX_object_type!=undefined?json.JSQEX_object_type:{beelinetype:false,ltype:false,utype:true,spiraltype:false};
    this.JSQEX_initialdata.addgeo=this.addgeo=json.addgeo!=undefined?json.addgeo:{side_string:false,support_beam:false};//生成几何体 side_string:侧弦 support_beam：支撑梁   true：添加
    this.JSQEX_initialdata.layout=this.layout=json.layout!=undefined?json.layout:{length1:20,subsection1:8,length2:20,subsection2:8,offset:0,width:12};//布局 length1:长度1,length2:长度2,offset:偏移,width:宽度
    this.JSQEX_initialdata.step=this.step=json.step!=undefined?json.step:{height:0};//梯级 height:高度
    this.JSQEX_initialdata.steps=this.steps=json.steps!=undefined?json.steps:{thickness:.8,depth:0,subsection:16};//台阶  thickness:厚度,depth:深度,subscction:分段数
    this.mrsteps={thickness:.8,depth:0,subsection:12};
    this.JSQEX_initialdata.support_beam=this.support_beam=json.support_beam!=undefined?json.support_beam:{depth:3.2,width:2}; //支撑梁 depth:深度,width:宽度
    this.mrsupport_beam={depth:3.2,width:2};
    this.JSQEX_initialdata.side_string=this.side_string=json.side_string!=undefined?json.side_string:{depth:4.0,width:.8,offset:0}//侧弦 depth:深度,width:宽度,offset:偏移
    this.JSQEX_initialdata.paltform=this.paltform=json.paltform!=undefined?json.paltform:{depth:0,width:10.00}
}
JSQEXBasicStructure.JSQEX_Stair_Utype.prototype = Object.create( JSQEXBasicStructure.JSQEX_Stair.prototype );
// JSQEXBasicStructure.JSQEX_Stair_Utype.prototype = new Object(JSQEXBasicStructure.JSQEX_Stair.prototype);
JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.constructor = JSQEXBasicStructure.JSQEX_Stair_Utype;

JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_showgui = function(json) {
    var scope=this;
    var object_type=scope.JSQEX_object_type;
    var tjlx=scope.tjlx;
    var addgeo=scope.addgeo;
    var layout=scope.layout;
    var step=scope.step;
    var steps=scope.steps
    var support_beam=scope.support_beam
    var side_string=scope.side_string;
    var paltform=scope.paltform;
    var params = {
            开放式: tjlx.open,
            封闭式: tjlx.close,
            落地式: tjlx.floor,
            侧弦:   addgeo.side_string,
            支撑梁: addgeo.support_beam,
            高度:   step.height, 
            长度1:   layout.length1,
            分段1:   layout.subsection1,
            长度2:   layout.length2,
            分段2:   layout.subsection2,
            偏移:   layout.offset,
            宽度:   layout.width,
            厚度:   steps.thickness,
            深度:   steps.depth,
            分段:   steps.subsection,
            深度_支:support_beam.depth,
            宽度_支:support_beam.width,
            宽度_侧:side_string.width,
            深度_侧:side_string.depth,
            偏移_侧:side_string.offset,
            // 深度_平:paltform.depth,
            宽度_平:paltform.width,
        };
    var gui = new dat.GUI( { width: 200 } );
    var folderGeometry = gui.addFolder( '类型' );
    folderGeometry.add( params, '开放式').onChange( function(val) {

    } );
    folderGeometry.add( params, '封闭式').onChange( function(val) {
 
    } );
    folderGeometry.add( params, '落地式').onChange( function(val) {
    } );
    // folderGeometry.open();
    var folderCamera = gui.addFolder( '生成几何体' );
    folderCamera.add( params, '侧弦').onChange( function(val) {
       scope.addgeo.side_string=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.add( params, '支撑梁').onChange( function(val) {
       scope.addgeo.support_beam=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.open();
    var folderCamera = gui.addFolder( '梯级' );
    folderCamera.add( params, '高度',1, 80, 1).onChange( function(val) {
       scope.step.height=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '布局' );
    folderCamera.add( params, '长度1',1, 50, 1).onChange( function(val) {
       scope.layout.length1=val;
       scope.point1.copy(new THREE.Vector3().subVectors(scope.point1,scope.point2).normalize().multiplyScalar(val).add(scope.point2));
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '分段1',1, 30, 1).onChange( function(val) {
       scope.layout.subsection1=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '长度2',1, 50, 1).onChange( function(val) {
       scope.layout.length2=val;
       scope.point3.copy(new THREE.Vector3().subVectors(scope.point3,scope.point4).normalize().multiplyScalar(val).add(scope.point4));
       scope.point2.copy(scope.point3);
       scope.point1.copy(new THREE.Vector3().subVectors(scope.point1,scope.point2).normalize().multiplyScalar(scope.layout.length1).add(scope.point2));
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '分段2',1, 30, 1).onChange( function(val) {
       scope.layout.subsection2=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '宽度',0, 20, 1).onChange( function(val) {
       scope.layout.width=val;
       scope.JSQEX_drawstair()
    } );
     folderCamera.add( params, '偏移',0, 20, 1).onChange( function(val) {
       scope.layout.offset=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.open();
    var folderCamera = gui.addFolder( '台阶' );
    folderCamera.add( params, '厚度',.1, 5.12, .1).onChange( function(val) {
       scope.steps.thickness=val;
       scope.mrsteps.thickness=val;
       scope.JSQEX_drawstair()

    } );
    folderCamera.add( params, '深度',0, 15, .1).onChange( function(val) {
       scope.steps.depth=val;
       scope.mrsteps.depth=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '支撑梁' );
    folderCamera.add( params, '深度_支',0, 80, 1).onChange( function(val) {
        if(scope.addgeo.support_beam){
            scope.support_beam.depth=val;
            scope.mrsupport_beam.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_支',.10, 15, .1).onChange( function(val) {
        if(scope.addgeo.support_beam){ 
            scope.support_beam.width=val;
            scope.mrsupport_beam.width=val;
            scope.JSQEX_drawstair()
        }
    } );
    var folderCamera = gui.addFolder( '侧弦' );
    folderCamera.add( params, '深度_侧',.5, 15, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_侧',.05, 5, .01).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.width=val;
            scope.JSQEX_drawstair()
        }   
    } );
    folderCamera.add( params, '偏移_侧',0, 12, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.offset=val;
            scope.JSQEX_drawstair()
        }
    } );
    var folderCamera = gui.addFolder( '平台' );
    folderCamera.add( params, '宽度_平',.5, 25, .1).onChange( function(val) {
        scope.paltform.width=val;
        scope.JSQEX_drawstair()
    } );
}

JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_getpoints1 = function(_json){
    if(this.JSQEX_limitwidthnum&&this.layout.width/2>this.JSQEX_limitwidthnum){
        this.layout.width=this.JSQEX_limitwidthnum*2;
        console.log("超出地台边界！")
    }
    var num1=this.layout.subsection1,num2=this.layout.subsection2,
    object_type=this.JSQEX_object_type,
    tjlx=this.tjlx,//类型 
    addgeo=this.addgeo,
    layout=this.layout,
    step=this.step,
    steps=this.steps,
    support_beam=this.support_beam,
    side_string=this.side_string,
    point1=this.point1,
    point2=this.point2,
    point3=this.point3,
    point4=this.point4,
    pdnum=this.JSQEX_pdnum;
    var arr2=[];
    this.arr=[];
    for(var x = 0; x <= num1; x ++ ) {
        this.arr.push( this.JSQEX_getpoints2(point1,point2,x,num1));
        if(x==num1){
            arr2.push( this.JSQEX_getpoints2(point1,point2,x,num1));
            arr2.push( this.JSQEX_getpoints2(point1,point2,x,num1,1));
        }
    }
    for(var x = 0; x <= num2; x ++ ) {
        this.arr.push( this.JSQEX_getpoints2(point3,point4,x,num2) ); 
    }
    return {arr:this.arr,arr2:arr2,pdnum:pdnum,num:num1+num2+1,tjlx:tjlx,object_type:object_type,addgeo:addgeo,layout:layout,step:step,steps:steps,support_beam:support_beam,side_string:side_string,pynum:num1,addplatform:num1,type:1};
}

JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_getpoints2 = function(point1,point2,index,num,lxnum){
    var fxver=new THREE.Vector3().copy(point2).sub(point1).normalize();
    var perlength=new THREE.Vector3().copy(point2).sub(point1).length()/num;
    if(lxnum){
        return new THREE.Vector3().copy(point2.clone().add(fxver.multiplyScalar(perlength*1))); 
    }else{
        return new THREE.Vector3().copy(point1.clone().add(fxver.multiplyScalar(perlength*index))); 
    }  
}

JSQEXBasicStructure.JSQEX_Stair_Ltype = function(json) {//L型楼梯对象
    JSQEXBasicStructure.JSQEX_Stair.call(this);
    this.Stair_child=true;
    this.point1=new THREE.Vector3(0,0,0);
    this.point2=new THREE.Vector3(0,0,0);
    this.point3=new THREE.Vector3(0,0,0);
    this.point4=new THREE.Vector3(0,0,0);
    this.ptpoint1=new THREE.Vector3(0,0,0);
    this.ptpoint2=new THREE.Vector3(0,0,0);
    this.ptpoint3=new THREE.Vector3(0,0,0);
    this.ptpoint4=new THREE.Vector3(0,0,0);
    this.ptpoint5=new THREE.Vector3(0,0,0);
    this.ver1=new THREE.Vector3().subVectors(this.point4,this.point3).normalize();
    this.JSQEX_initialdata.tjlx=this.tjlx=json.tjlx!=undefined?json.tjlx:{open:false,close:true,floor:false};//类型 open：开放式 close：闭合式 floor：落地式 true：添加
    this.JSQEX_initialdata.JSQEX_object_type=this.JSQEX_object_type=json.JSQEX_object_type!=undefined?json.JSQEX_object_type:{beelinetype:false,ltype:true,utype:false,spiraltype:false};
    this.JSQEX_initialdata.addgeo=this.addgeo=json.addgeo!=undefined?json.addgeo:{side_string:false,support_beam:false};//生成几何体 side_string:侧弦 support_beam：支撑梁   true：添加
    this.JSQEX_initialdata.layout=this.layout=json.layout!=undefined?json.layout:{length1:20.00,subsection1:8,length2:20.00,subsection2:8,offset:0,width:12.00,angle:90};//布局 length1:长度1,length2:长度2,offset:偏移,width:宽度,angle:角度
    this.JSQEX_initialdata.step=this.step=json.step!=undefined?json.step:{height:0};//梯级 height:高度
    this.JSQEX_initialdata.steps=this.steps=json.steps!=undefined?json.steps:{thickness:.8,depth:0,subsection:16};//台阶  thickness:厚度,depth:深度,subscction:分段数
    this.mrsteps={thickness:.8,depth:0,subsection:16};
    this.JSQEX_initialdata.support_beam=this.support_beam=json.support_beam!=undefined?json.support_beam:{depth:3.2,width:2}; //支撑梁 depth:深度,width:宽度
    this.mrsupport_beam={depth:3.2,width:2};
    this.JSQEX_initialdata.side_string=this.side_string=json.side_string!=undefined?json.side_string:{depth:4.0,width:.8,offset:0}//侧弦 depth:深度,width:宽度,offset:偏移
    this.JSQEX_initialdata.paltform=this.paltform=json.paltform!=undefined?json.paltform:{depth:0,width:4.00}
}
JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype = Object.create( JSQEXBasicStructure.JSQEX_Stair.prototype );
JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype.constructor = JSQEXBasicStructure.JSQEX_Stair_Ltype;

JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype.JSQEX_showgui = function(json) {
    var scope=this;
    var object_type=scope.JSQEX_object_type;
    var tjlx=scope.tjlx;
    var addgeo=scope.addgeo;
    var layout=scope.layout;
    var step=scope.step;
    var steps=scope.steps
    var support_beam=scope.support_beam
    var side_string=scope.side_string;
    var paltform=scope.paltform;
    var params = {
            开放式: tjlx.open,
            封闭式: tjlx.close,
            落地式: tjlx.floor,
            侧弦:   addgeo.side_string,
            支撑梁: addgeo.support_beam,
            高度:   step.height,
            长度1:   layout.length1,
            分段1:   layout.subsection1,
            长度2:   layout.length2,
            分段2:   layout.subsection2,
            偏移:   layout.offset,
            宽度:   layout.width,
            角度:   layout.angle,
            高度值: step.height,
            厚度:   steps.thickness,
            深度:   steps.depth,
            分段:   steps.subsection,
            深度_支:support_beam.depth,
            宽度_支:support_beam.width,
            宽度_侧:side_string.width,
            深度_侧:side_string.depth,
            偏移_侧:side_string.offset,
            // 深度_平:paltform.depth,
        };
    var gui = new dat.GUI( { width: 200 } );
    var folderGeometry = gui.addFolder( '类型' );
    folderGeometry.add( params, '开放式').onChange( function(val) {

    } );
    folderGeometry.add( params, '封闭式').onChange( function(val) {
 
    } );
    folderGeometry.add( params, '落地式').onChange( function(val) {
    } );
    // folderGeometry.open();
    var folderCamera = gui.addFolder( '生成几何体' );
    folderCamera.add( params, '侧弦').onChange( function(val) {
       scope.addgeo.side_string=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.add( params, '支撑梁').onChange( function(val) {
       scope.addgeo.support_beam=val;
       scope.JSQEX_drawstair()
    } );;
    folderCamera.open();
    var folderCamera = gui.addFolder( '梯级' );
    folderCamera.add( params, '高度',1, 80, 1).onChange( function(val) {
       scope.step.height=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '布局' );
    folderCamera.add( params, '长度1',1, 50, 1).onChange( function(val) {
       scope.layout.length1=val;
       scope.point1.copy(new THREE.Vector3().subVectors(scope.point1,scope.point2).normalize().multiplyScalar(val).add(scope.point2));
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '分段1',1, 30, 1).onChange( function(val) {
       scope.layout.subsection1=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '长度2',1, 50, 1).onChange( function(val) {
       scope.layout.length2=val;
       scope.point3.copy(new THREE.Vector3().subVectors(scope.point3,scope.point4).normalize().multiplyScalar(val).add(scope.point4));
       scope.point2.copy(scope.point3);
       scope.point1.copy(scope.ver1.clone().multiplyScalar(scope.layout.length1).add(scope.point2));
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '分段2',1, 30, 1).onChange( function(val) {
       scope.layout.subsection2=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '宽度',0, 20, 1).onChange( function(val) {
       scope.layout.width=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '偏移',0, 20, 1).onChange( function(val) {
       scope.layout.offset=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.add( params, '角度',-90, 90, 0.001).onChange( function(val) {
       scope.layout.angle=val;
       scope.JSQEX_drawstair()
    } );
    folderCamera.open();
    var folderCamera = gui.addFolder( '台阶' );
    folderCamera.add( params, '厚度',.1, 5.12, .1).onChange( function(val) {
       scope.steps.thickness=val;
       scope.mrsteps.thickness=val;
       scope.JSQEX_drawstair()

    } );
    folderCamera.add( params, '深度',0, 15, 1).onChange( function(val) {
       scope.steps.depth=val;
       scope.mrsteps.depth=val;
       scope.JSQEX_drawstair()
    } );
    var folderCamera = gui.addFolder( '支撑梁' );
    folderCamera.add( params, '深度_支',0, 80, 1).onChange( function(val) {
        if(scope.addgeo.support_beam){
            scope.support_beam.depth=val;
            scope.mrsupport_beam.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_支',.10, 15, .1).onChange( function(val) {
        if(scope.addgeo.support_beam){ 
            scope.support_beam.width=val;
            scope.mrsupport_beam.width=val;
            scope.JSQEX_drawstair()
        }
    } );
    var folderCamera = gui.addFolder( '侧弦' );
    folderCamera.add( params, '深度_侧',.5, 15, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.depth=val;
            scope.JSQEX_drawstair()
        } 
    } );
    folderCamera.add( params, '宽度_侧',.05, 5, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.width=val;
            scope.JSQEX_drawstair()
        }   
    } );
    folderCamera.add( params, '偏移_侧',0, 12, .1).onChange( function(val) {
        if(scope.addgeo.side_string){ 
            scope.side_string.offset=val;
            scope.JSQEX_drawstair()
        }
    } );
}

JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype.JSQEX_getpoints1 = function(_json){
    if(this.JSQEX_limitwidthnum&&this.layout.width/2>this.JSQEX_limitwidthnum){
        this.layout.width=this.JSQEX_limitwidthnum*2;
        console.log("超出地台边界！")
    }
    var _num1=this.layout.subsection1,
    _num2=this.layout.subsection2,
    object_type=this.JSQEX_object_type,
    tjlx=this.tjlx,
    addgeo=this.addgeo,
    layout=this.layout,
    angle=this.layout.angle,
    step=this.step,
    steps=this.steps,
    width=this.layout.width,
    length=this.layout.length2,
    support_beam=this.support_beam,
    side_string=this.side_string,
    point1=this.point1,
    point2=this.point2,
    point3=this.point3,
    point4=this.point4,
    pdnum=this.JSQEX_pdnum,
    offset=this.layout.offset;
        var arr=[],arr2=[];
        var _points=this.JSQEX_getRotatepoints({point1:point4,point2:point3,angle:angle,width:width,length:this.layout.length1,offset:offset});
        point1=_points[1];
        point2=_points[0];
        for (var x = 0; x <= _num1; x ++ ) {
            arr.push( this.JSQEX_getpoints2(point1,point2,x,_num1));
            if(x==_num1){
                arr2.push( this.JSQEX_getpoints2(point1,point2,x,_num1));
                arr2.push( this.JSQEX_getpoints2(point1,point2,x,_num1,1));
            }
        }
        for (var x = 0; x <= _num2; x ++ ) {
            arr.push( this.JSQEX_getpoints2(point3,point4,x,_num2) );
        }
        return {arr:arr,arr2:arr2,pdnum:pdnum,num:_num1+_num2+1,tjlx:tjlx,object_type:object_type,addgeo:addgeo,layout:layout,step:step,steps:steps,support_beam:support_beam,side_string:side_string,pynum:_num1,addplatform:_num1,type:2};
}

JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype.JSQEX_getpoints2 = function(point1,point2,index,num,lxnum){
    var fxver=new THREE.Vector3().copy(point2).sub(point1).normalize();
    var perlength=new THREE.Vector3().copy(point2).sub(point1).length()/num;
    if(lxnum){
        return new THREE.Vector3().copy(point2.clone().add(fxver.multiplyScalar(perlength*1))); 
    }else{
        return new THREE.Vector3().copy(point1.clone().add(fxver.multiplyScalar(perlength*index))); 
    }
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_getRotatepoints = function(json) {//用于L型楼梯执行偏移操作时获取点的数据
    if(json.angle==180){
        json.angle=179.99999999;
    }else if(json.angle==-180){
        json.angle=-179.99999999;
    }
    var _ver1=new THREE.Vector3().subVectors(json.point2,json.point1).normalize();
    var _ver2=new THREE.Vector3();
    _ver2.x=_ver1.x*Math.cos(json.angle*Math.PI/180)-_ver1.z*Math.sin(json.angle*Math.PI/180);
    _ver2.z=_ver1.x*Math.sin(json.angle*Math.PI/180)+_ver1.z*Math.cos(json.angle*Math.PI/180);
    _ver2.normalize();
    var offset=json.offset;
    var pyl_r,pdwidth;
    if(this.addgeo.side_string){
        pyl_r=this.side_string.width/2;
        pdwidth=json.width+2*this.side_string.width;
    }else{
        pdwidth=json.width;
        pyl_r=pdwidth/2*this.JSQEX_Railingoffset.l_r;
    }
    var _length=pdwidth/2/Math.tan((180-Math.abs(json.angle))/2*Math.PI/180);
    var _ver=_ver1.clone().multiplyScalar(_length).add(_ver2.clone().multiplyScalar(_length+offset));
    var _pointxz1=_ver.clone().add(json.point2);
    var _pointxz2=_ver2.clone().multiplyScalar(json.length).add(_pointxz1);
    var _normal=this.JSQEX_Getnormal(_ver1);  
    // if(json.addplatform){
        var _length1=Math.tan((Math.abs(json.angle))/2*Math.PI/180)*(pdwidth-pyl_r);
        var _length2=Math.tan((Math.abs(json.angle))/2*Math.PI/180)*pyl_r; 
        if(json.angle>0){
            this.ptpoint3=_normal.clone().multiplyScalar(-pdwidth/2).add(json.point2);
            this.ptpoint4=_normal.clone().multiplyScalar(pdwidth/2).add(json.point2);
            this.ptpoint1=this.ptpoint3.clone().add(_ver1.clone().multiplyScalar(2*_length));
            this.ptpoint2=this.ptpoint1.clone().add(_ver2.clone().multiplyScalar(2*_length+offset));
            this.ptpoint5=this.ptpoint4.clone().add(_ver2.clone().multiplyScalar(offset));
               
            this._ptpoint1=_normal.clone().multiplyScalar(-pdwidth/2+pyl_r).add(json.point2).add(_ver1.clone().multiplyScalar(_length1));
            this._ptpoint2=_normal.clone().multiplyScalar(pdwidth/2-pyl_r).add(json.point2).add(_ver1.clone().multiplyScalar(_length2));
            // this._ptpoint3=_normal.clone().multiplyScalar(-pdwidth/2+pyl_r).add(json.point2);
            // this._ptpoint4=_normal.clone().multiplyScalar(pdwidth/2-pyl_r).add(json.point2);
            // this._ptpoint1=this._ptpoint3.clone().add(_ver1.clone().multiplyScalar(2*_length2));
            // this._ptpoint2=this._ptpoint1.clone().add(_ver2.clone().multiplyScalar(2*_length2+offset));
            // this._ptpoint5=this._ptpoint4.clone().add(_ver2.clone().multiplyScalar(offset));
        }else{
            this.ptpoint4=_normal.clone().multiplyScalar(-pdwidth/2).add(json.point2);
            this.ptpoint5=_normal.clone().multiplyScalar(pdwidth/2).add(json.point2);
            this.ptpoint2=this.ptpoint5.clone().add(_ver1.clone().multiplyScalar(2*_length));
            this.ptpoint1=this.ptpoint2.clone().add(_ver2.clone().multiplyScalar(2*_length+offset));
            this.ptpoint3=this.ptpoint4.clone().add(_ver2.clone().multiplyScalar(offset));
  
            this._ptpoint2=_normal.clone().multiplyScalar(pdwidth/2-pyl_r).add(json.point2).add(_ver1.clone().multiplyScalar(_length1));
            this._ptpoint1=_normal.clone().multiplyScalar(-pdwidth/2+pyl_r).add(json.point2).add(_ver1.clone().multiplyScalar(_length2));

        }
        // var _length1=Math.tan((Math.abs(json.angle))/2*Math.PI/180)*(json.width-pyl_r);
        // var _length2=Math.tan((Math.abs(json.angle))/2*Math.PI/180)*pyl_r;  
        // this._ptpoint1=_normal.clone().multiplyScalar(-json.width/2+pyl_r).add(json.point2).add(_ver1.clone().multiplyScalar(_length1));
        // this._ptpoint2=_normal.clone().multiplyScalar(json.width/2-pyl_r).add(json.point2).add(_ver1.clone().multiplyScalar(_length2));
    // }
    return [_pointxz1,_pointxz2];
}

JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype.JSQEX_Spiralstair = function(json){
    if(this.tjlx.close||this.tjlx.floor){
        this.steps.thickness=this.step.height/this.steps.subsection;
        this.steps.depth=0;
    }else{
        this.steps.thickness=this.mrsteps.thickness;
        this.steps.depth=this.mrsteps.depth;
    }
    var arr=json.arr;
    var tjhd=this.steps.thickness;
    var overdistance=this.steps.depth;
    var cxwidth=this.side_string.width;
    var zclheight=this.support_beam.depth;
    var pdwidth=(this.layout.width1-this.layout.width2)/this.steps.subsection
    var perheight=this.step.height/this.steps.subsection;
    var _pynum=json.pynum;
    var _pypos=new THREE.Vector3(0,0,0);
    var pdyval=0;
    var fxver_1=new THREE.Vector3().subVectors(arr[0],arr[1]);
    var normal=this.JSQEX_Getnormal(fxver_1);
    var fxver1=fxver_1.clone().normalize();
    var fxver2=fxver_1.clone().normalize();
    var cos1=1,cos2=1;
    if(pdwidth!=0){
        fxver1=fxver_1.clone().sub(normal.clone().multiplyScalar(-pdwidth/2)).normalize();
        fxver2=fxver_1.clone().sub(normal.clone().multiplyScalar(pdwidth/2)).normalize();
        cos1=fxver1.clone().dot(fxver_1.clone().normalize());
        cos2=fxver2.clone().dot(fxver_1.clone().normalize());
    }
    var pdmin_max;
    for(var i=0,j=arr.length-1;i<j;i++){
        var ver1=arr[i+1].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*(i+1))/2)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(_pypos); 
        var ver2=arr[i+1].clone().add(normal.clone().multiplyScalar(-(json.layout.width1-pdwidth*(i+1))/2)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(_pypos);
        var ver3=arr[i].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*i)/2)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver1.clone().multiplyScalar(overdistance/cos1)).add(_pypos);
        var ver4=arr[i].clone().add(normal.clone().multiplyScalar(-(json.layout.width1-pdwidth*i)/2)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver2.clone().multiplyScalar(overdistance/cos2)).add(_pypos);
        var ver5=ver1.clone().sub(new THREE.Vector3(0,tjhd,0)); 
        var ver6=ver2.clone().sub(new THREE.Vector3(0,tjhd,0));
        var ver7=ver3.clone().sub(new THREE.Vector3(0,tjhd,0));
        var ver8=ver4.clone().sub(new THREE.Vector3(0,tjhd,0));
        if(!json.addgeo.side_string){//前后左右移动
            var _offsetl_r=this.layout.width1>this.layout.width2?this.layout.width2/2:this.layout.width1/2;
            this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
            this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
            if(i==j-1||i==0){
                this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
                this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
            }
        }
        this.JSQEX_vertices.push(
            ver1,ver2,ver3,ver4,ver5,ver6,ver7,ver8
        )
        var pdarrr=[ver1,ver2,ver3,ver4,ver5,ver6,ver7,ver8];
        var min_max1=this.JSQEX_computeBoundingBox(pdarrr);
        if(i==j-1){
            this.JSQEX_jdpoints=[];
            this.JSQEX_jdpoints.push(ver1,ver2);
        }
        //上面
        var _fxver=new THREE.Vector3().subVectors(ver2,ver4);
        var _normal=this.JSQEX_Getnormal(_fxver);
        var uvp1,uvp2,uvp3,uvp4;
        if(json.layout.width1-json.layout.width2>=0){//设置上下面uv坐标范围
            if(json.layout.width1-json.layout.width2==0){
                uvp1=ver1;
                uvp2=ver2;
                uvp3=ver3;
                uvp4=ver4;
            }else{
                uvp1=ver3.clone().sub(fxver_1.clone().normalize().multiplyScalar(json.layout.length/json.steps.subsection+overdistance));
                uvp2=ver4.clone().sub(fxver_1.clone().normalize().multiplyScalar(json.layout.length/json.steps.subsection+overdistance));
                uvp3=ver3;
                uvp4=ver4;
            }
        }else{
            uvp1=ver1;
            uvp2=ver2;
            uvp3=ver1.clone().add(fxver_1.clone().normalize().multiplyScalar(json.layout.length/json.steps.subsection+overdistance));
            uvp4=ver2.clone().add(fxver_1.clone().normalize().multiplyScalar(json.layout.length/json.steps.subsection+overdistance));
        }
        //上面
        var min_max2={point1:uvp1,point2:uvp2,point3:uvp3,point4:uvp4};
        if(i==0){
            pdmin_max=min_max2;
        }
        var _scale=(json.layout.width1-json.layout.width2>=0?new THREE.Vector3().subVectors(ver3,ver4).length():new THREE.Vector3().subVectors(ver1,ver2).length())/new THREE.Vector3().subVectors(pdmin_max.point4,pdmin_max.point3).length();
        var _scale_f=new THREE.Vector3().subVectors(ver3,ver4).length()/(json.layout.width1-json.layout.width2>=0?new THREE.Vector3().subVectors(pdmin_max.point4,pdmin_max.point3).length():new THREE.Vector3().subVectors(pdmin_max.point2,pdmin_max.point1).length());
        var _scale_b=new THREE.Vector3().subVectors(ver1,ver2).length()/(json.layout.width1-json.layout.width2>=0?new THREE.Vector3().subVectors(pdmin_max.point4,pdmin_max.point3).length():new THREE.Vector3().subVectors(pdmin_max.point2,pdmin_max.point1).length());
        

        var _arr=[
            [0+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
            [2+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_max2,materialInd:0,scale:new THREE.Vector2(_scale,1)});
        //上面
        if(json.tjlx.open){
            var _arr=[
                [5+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum]//下面
            ]
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_max2,materialInd:0,scale:new THREE.Vector2(_scale,1)});
            var _arr=[    
                [0+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum],
                [4+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum],//左面
                [3+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum],
                [7+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum]//右面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:2});
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum]//前面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1,scale:new THREE.Vector2(_scale_f,1)});
            var _arr=[
                [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum],
                [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum]//后面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1,scale:new THREE.Vector2(_scale_b,1)});
        }
        if(json.tjlx.close||json.tjlx.floor){
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum]//前面
            ] 
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1,scale:new THREE.Vector2(_scale_f,1)}); 
        }
        this.JSQEX_verticesnum+=8;
    }
    if(json.addgeo.support_beam||!json.tjlx.open){//判断是否显示支持梁
        this.JSQEX_Addsupport_beam(json);
    }
    if(json.addgeo.side_string){//判断是否显示侧弦
        this.JSQEX_armrest[0]=[];
        this.JSQEX_armrest[1]=[];
        this.JSQEX_armrest[2]=[];
        this.JSQEX_armrest[3]=[];
        this.JSQEX_Addside_string(json);
    }
}

JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype.JSQEX_Addsupport_beam = function(json){
    var min_maxL,min_maxR,min_maxB,Cal_vertice=[];
    var pdLeft=[],pdRight=[],pdBottom=[];
    var arr=json.arr;
    var tjhd=json.steps.thickness;
    var allheight=json.step.height;
    var overdistance=json.steps.depth;
    var zclheight=json.support_beam.depth;
    var pdwidth=(json.layout.width1-json.layout.width2)/json.steps.subsection;
    var perheight=allheight/json.steps.subsection;
    var pdyval=0;
    var _widthzcl=json.support_beam.width/2;
    if(json.tjlx.close||json.tjlx.floor){
        tjhd=this.steps.thickness=0;
        overdistance=0;
        zclheight=perheight-tjhd;
        this.support_beam.depth=zclheight;
        this.support_beam.width=_widthzcl*2;
        this.steps.thickness=zclheight;
        this.steps.depth=0;
    }else{
        tjhd=this.mrsteps.thickness;
        overdistance=this.mrsteps.depth;
        zclheight=this.support_beam.depth=this.mrsupport_beam.depth;
        this.support_beam.width=this.mrsupport_beam.width;
        _widthzcl=this.support_beam.width/2;
    }
    if(json.tjlx.floor){
        zclheight=allheight;
        this.support_beam.depth=allheight;
    }
    var fxver=new THREE.Vector3().subVectors(arr[0],arr[1]);
    var normal=this.JSQEX_Getnormal(fxver);
    for(var i=0,j=arr.length-1;i<j;i++){
        var ver_1=null,ver_2=null,ver_3=null,ver_4=null,ver_5=null,ver_6=null,ver_7=null,ver_8=null,ver_9=null,ver_10=null;
        if(json.tjlx.open){
            ver_1=arr[i+1].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0)); 
            ver_2=arr[i+1].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
            ver_3=arr[i].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
            ver_4=arr[i].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
        }else{
            ver_1=arr[i+1].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*(i+1))/2)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0)); 
            ver_2=arr[i+1].clone().add(normal.clone().multiplyScalar(-(json.layout.width1-pdwidth*(i+1))/2)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
            ver_3=arr[i].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*i)/2)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
            ver_4=arr[i].clone().add(normal.clone().multiplyScalar(-(json.layout.width1-pdwidth*i)/2)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0));
        }
        ver_5=ver_1.clone().sub(new THREE.Vector3(0,zclheight,0)); 
        ver_6=ver_2.clone().sub(new THREE.Vector3(0,zclheight,0));
        ver_7=ver_3.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        ver_8=ver_4.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        _arr=[ver_1,ver_2,ver_3,ver_4,ver_5,ver_6,ver_7,ver_8];
        if(perheight*i-tjhd-pdyval<=zclheight&&zclheight<=perheight*(i+1)-tjhd-pdyval){
            var overlong=(tjhd+zclheight)/(perheight/fxver.length())-(json.layout.length/json.steps.subsection)*i;
            var ver_9=new THREE.Vector3().subVectors(ver_1,ver_3).setY(0).multiplyScalar(overlong/json.layout.length*json.steps.subsection).add(ver_3.clone().setY(0));
            var ver_10=new THREE.Vector3().subVectors(ver_2,ver_4).setY(0).multiplyScalar(overlong/json.layout.length*json.steps.subsection).add(ver_4.clone().setY(0));
            _arr.push(ver_9,ver_10);
        } 
        this.JSQEX_pdyval(_arr,pdyval);
        this.JSQEX_vertices.push(
            ver_1,ver_2,ver_3,ver_4,ver_5,ver_6,ver_7,ver_8
        )
        if(ver_9!=null){
            this.JSQEX_vertices.push(ver_9,ver_10);
        }
        pdLeft.push(ver_1,ver_3,ver_5,ver_7);
        pdRight.push(ver_2,ver_4,ver_6,ver_8);
        pdBottom.push(ver_5,ver_6,ver_7,ver_8);
        Cal_vertice.push([ver_1,ver_2,ver_3,ver_4,ver_5,ver_6,ver_7,ver_8,ver_9,ver_10])
    }
    min_maxL=this.JSQEX_computeBoundingBox(pdLeft);
    min_maxR=this.JSQEX_computeBoundingBox(pdRight);
    if(json.tjlx.open){
        min_maxB=this.JSQEX_computeBoundingBox2(pdBottom);
    }else{
        min_maxB=this.JSQEX_computeBoundingBox2(pdBottom,(json.layout.width1-json.layout.width2)/2,3);
    }
    var _pdheight=perheight+zclheight>this.step.height-tjhd?this.step.height-tjhd:perheight+zclheight;
    // if(json.tjlx.close){
    //     _pdheight=zclheight;
    // }
    for(var i=0,j=Cal_vertice.length;i<j;i++){
        if(Cal_vertice[i][9]!=null){
            if(i==j-1){//最后一阶后面
                var _arr=[
                    [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum],
                    [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum]
                ]
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            }
            //左面
            var _arr=[
                [0+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
                [4+ this.JSQEX_verticesnum, 8+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL,min_max2:min_maxL,materialInd:5,uvlx:this.JSQEX_uvlx});
            //左面
            //右面
            var _arr=[
                [3+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
                [9+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR,min_max2:min_maxR,materialInd:5,uvlx:this.JSQEX_uvlx});
            //右面
            //下面
            var _arr=[
                [6+this.JSQEX_verticesnum, 8+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum],
                [8+this.JSQEX_verticesnum, 9+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum],
                [8+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,9+this.JSQEX_verticesnum],
                [4+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,9+this.JSQEX_verticesnum]
            ]
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB,materialInd:3});
            //下面
            //开放状态 则添加前面
            if(json.tjlx.open){
                 var _arr=[
                    [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum],
                    [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum]
                ]
                // this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:4});
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            }
            //开放状态 则添加前面    
            this.JSQEX_verticesnum+=10;
        }else{
            if(i==j-1){//最后一阶后面
                var _arr=[
                    [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum],
                    [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum]
                ]
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
                // this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:4});
                
            }
            //左面
            var _arr=[
                [0+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
                [4+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL,min_max2:min_maxL,materialInd:5,uvlx:this.JSQEX_uvlx});
            //左面
            //右面
            var _arr=[
                [3+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR,min_max2:min_maxR,materialInd:5,uvlx:this.JSQEX_uvlx});
            //右面
            //下面
            var _arr=[
                [5+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum,4+this.JSQEX_verticesnum],
                [7+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum,4+this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB,materialInd:3});
            //下面
            //开放状态 则添加前面
            if(json.tjlx.open){
                 var _arr=[
                    [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum],
                    [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum]
                ]
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            }
            //开放状态 则添加前面    
            this.JSQEX_verticesnum+=8;
        }
    }
}

JSQEXBasicStructure.JSQEX_Stair_Beeline.prototype.JSQEX_Addside_string = function(json){
    var min_maxL1,min_maxR1,min_maxB1,min_maxT1,min_maxL2,min_maxR2,min_maxB2,min_maxT2,Cal_vertice=[];
    var pdLeft1=[],pdRight1=[],pdBottom1=[],pdTop1=[],pdLeft2=[],pdRight2=[],pdBottom2=[],pdTop2=[];
    var arr=json.arr;
    var tjhd=json.steps.thickness;
    var allheight=json.step.height;
    var overdistance=json.steps.depth;
    var cxwidth=json.side_string.width;
    var zclheight=json.support_beam.depth;
    // var pdwidth=json.layout.width/2;
    var pdwidth=(json.layout.width1-json.layout.width2)/json.steps.subsection
    var sidehd2=json.side_string.depth;
    var perheight=allheight/json.steps.subsection;
    var _offset=json.layout.offset;
    var pdyval=0;
    var _widthzcl=json.support_beam.width/2;
    var fxver=new THREE.Vector3().subVectors(arr[0],arr[0+1]);
    var normal=this.JSQEX_Getnormal(fxver);
    for(var i=0,j=arr.length-1;i<j;i++){
        var v1=null,v2=null,v3=null,v4=null,v5=null,v6=null,v7=null,v8=null,v9=null,v10=null,v11=null,v12=null,v13=null,v14=null,v15=null,v16=null,v17=null,v18=null,v19=null,v20=null;
         //侧弦实现
        var _num=i+1;
        var _cxpynum=new THREE.Vector3(0,1,0).multiplyScalar(json.side_string.offset);
        //左边栏上面
        var v1=arr[_num].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*(i+1))/2+cxwidth)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        var v2=arr[_num].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*(i+1))/2)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        var v3=arr[i].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*i)/2+cxwidth)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        var v4=arr[i].clone().add(normal.clone().multiplyScalar((json.layout.width1-pdwidth*i)/2)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        //右边栏上面
        var v5=arr[_num].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar((json.layout.width1-pdwidth*(i+1))/2)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        var v6=arr[_num].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar((json.layout.width1-pdwidth*(i+1))/2+cxwidth)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum);
        var v7=arr[i].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar((json.layout.width1-pdwidth*i)/2)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        var v8=arr[i].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar((json.layout.width1-pdwidth*i)/2+cxwidth)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum);
        //左边栏下面
        var v9=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v1.clone());
        var v10=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v2.clone());
        var v11=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v3.clone());
        var v12=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v4.clone());
        //右边栏下面
        var v13=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v5.clone());
        var v14=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v6.clone());
        var v15=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v7.clone());
        var v16=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v8.clone());
        var _offsetl_r=cxwidth;
        this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
        this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
        if(i==j-1||i==0){
            this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
            this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*.5).multiplyScalar(-1)));
        }
        var _arr=[v9,v10,v11,v12,v13,v14,v15,v16];
        if(perheight*(i+1)+json.side_string.offset-pdyval<=json.side_string.depth&&json.side_string.depth<=perheight*(i+2)+json.side_string.offset-pdyval){
            var overlong=(json.side_string.depth-json.side_string.offset-perheight)/(perheight/fxver.length())-(json.layout.length/json.steps.subsection)*i;
            var v17=new THREE.Vector3().subVectors(v1,v3).setY(0).multiplyScalar(overlong/json.layout.length*json.steps.subsection).add(v3.clone().setY(0))
            var v18=new THREE.Vector3().subVectors(v2,v4).setY(0).multiplyScalar(overlong/json.layout.length*json.steps.subsection).add(v4.clone().setY(0))
            var v19=new THREE.Vector3().subVectors(v5,v7).setY(0).multiplyScalar(overlong/json.layout.length*json.steps.subsection).add(v7.clone().setY(0))
            var v20=new THREE.Vector3().subVectors(v6,v8).setY(0).multiplyScalar(overlong/json.layout.length*json.steps.subsection).add(v8.clone().setY(0))
            _arr.push(v17,v18,v19,v20);
        }    
        this.JSQEX_pdyval(_arr,pdyval);
        this.JSQEX_vertices.push(
            v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16
        )
        if(v17!=null){
            this.JSQEX_vertices.push(v17,v18,v19,v20)
        }
        pdLeft1.push(v1,v3,v9,v11);
        pdRight1.push(v2,v4,v10,v12);
        pdBottom1.push(v9,v10,v11,v12);
        pdTop1.push(v1,v2,v3,v4);
        pdLeft2.push(v5,v7,v13,v15);
        pdRight2.push(v6,v8,v14,v16);
        pdBottom2.push(v13,v14,v15,v16);
        pdTop2.push(v5,v6,v7,v8)
        Cal_vertice.push([v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20])
        if(i==j-1){
            this.JSQEX_jdpoints=[];
            this.JSQEX_jdpoints.push(v1,v6);
        }
    }
    min_maxL1=this.JSQEX_computeBoundingBox(pdLeft1);
    min_maxR1=this.JSQEX_computeBoundingBox(pdRight1);
    min_maxB1=this.JSQEX_computeBoundingBox2(pdBottom1,(json.layout.width1-json.layout.width2)/2);
    min_maxT1=this.JSQEX_computeBoundingBox2(pdTop1,(json.layout.width1-json.layout.width2)/2);
    min_maxL2=this.JSQEX_computeBoundingBox(pdLeft2);
    min_maxR2=this.JSQEX_computeBoundingBox(pdRight2);
    min_maxB2=this.JSQEX_computeBoundingBox2(pdBottom2,-(json.layout.width1-json.layout.width2)/2,2);
    min_maxT2=this.JSQEX_computeBoundingBox2(pdTop2,-(json.layout.width1-json.layout.width2)/2,2);
    for(var i=0,j=Cal_vertice.length;i<j;i++){
        if(i==0){
            var _arr=[
                [2+ this.JSQEX_verticesnum, 10+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum],
                [10+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
            var _arr=[
                [6+ this.JSQEX_verticesnum, 14+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum],
                [14+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
        }
        if(i==j-1){
            var _arr=[
                [1+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum,0+ this.JSQEX_verticesnum],
                [9+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,0+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
            var _arr=[
                [5+ this.JSQEX_verticesnum, 13+ this.JSQEX_verticesnum,4+ this.JSQEX_verticesnum],
                [13+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,4+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:sidehd2});
        }
        //左上
        var _arr=[
            [0+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
            [2+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxT1,materialInd:6});
        // this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxT1,min_max2:min_maxT1,materialInd:6});
        //右上
        var _arr=[
            [4+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
            [6+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxT2,materialInd:6});
        // this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxT2,min_max2:min_maxT2,materialInd:6});
        if(Cal_vertice[i][17]!=null){
            var overlong=fxver.clone().normalize().multiplyScalar(-1).multiplyScalar((json.side_string.depth-json.side_string.offset-perheight)/(perheight/fxver.length()));
            var v17=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(pdwidth+cxwidth));
            var v18=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(pdwidth));
            var v19=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth));
            var v20=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth+cxwidth));
            //左下
            var _arr=[
                [10+ this.JSQEX_verticesnum,16+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum],
                [16+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum],
                [16+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB1,materialInd:6});
            // this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxB1,min_max2:min_maxB1,materialInd:6,uvlx:2});
            //左左
            var _arr=[
                [0+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,16+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum],
                [16+ this.JSQEX_verticesnum,10+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL1,min_max2:min_maxL1,materialInd:8,uvlx:this.JSQEX_uvlx});
            //左右
            var _arr=[
                [3+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
                [11+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
                [17+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR1,min_max2:min_maxR1,materialInd:8,uvlx:this.JSQEX_uvlx});
            //右下
            var _arr=[
                [14+ this.JSQEX_verticesnum,18+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum],
                [18+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum],
                [18+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB2,materialInd:6});
            // this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxB2,min_max2:min_maxB2,materialInd:6,uvlx:2});
            //右左
            var _arr=[
                [4+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,18+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum],
                [18+ this.JSQEX_verticesnum,14+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL2,min_max2:min_maxL2,materialInd:8,uvlx:this.JSQEX_uvlx});
            //右右
            var _arr=[
                [7+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
                [15+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
                [19+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR2,min_max2:min_maxR2,materialInd:8,uvlx:this.JSQEX_uvlx});
            this.JSQEX_verticesnum+=20;
        }else{
            //左下
            var _arr=[
                [10+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB1,materialInd:6});
            // this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxB1,min_max2:min_maxB1,materialInd:6,uvlx:2});
            //左左
            var _arr=[
                [0+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,10+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL1,min_max2:min_maxL1,materialInd:8,uvlx:this.JSQEX_uvlx});
            //左右
            var _arr=[
                [3+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
                [11+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR1,min_max2:min_maxR1,materialInd:8,uvlx:this.JSQEX_uvlx});
            //右下
            var _arr=[
                [14+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB2,materialInd:6});
            // this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxB2,min_max2:min_maxB2,materialInd:6,uvlx:2});
            //右左
            var _arr=[
                [4+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,14+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL2,min_max2:min_maxL2,materialInd:8,uvlx:this.JSQEX_uvlx});
            //右右
            var _arr=[
                [7+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
                [15+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR2,min_max2:min_maxR2,materialInd:8,uvlx:this.JSQEX_uvlx});
            this.JSQEX_verticesnum+=16;
        }
    }
}

JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_Spiralstair = function(json){
    if(this.tjlx.close||this.tjlx.floor){
        this.steps.thickness=this.step.height/json.num;
        this.steps.depth=0;
    }else{
        this.paltform.depth=this.steps.thickness=this.mrsteps.thickness;
        this.steps.depth=this.mrsteps.depth;
    }
    var arr=json.arr;
    var tjhd=this.steps.thickness;
    var allheight=this.step.height;
    var overdistance=this.steps.depth;
    var pdwidth=this.layout.width/2;
    var _offset=this.layout.offset;
    var perheight=allheight/(json.num);
    var _pynum=json.pynum;
    var _pypos=new THREE.Vector3(0,0,0);
    var pdyval=0;
    for(var i=0,j=arr.length-1;i<j;i++){
        var fxver=new THREE.Vector3().subVectors(arr[i],arr[i+1]);
        var normal=this.JSQEX_Getnormal(fxver);
        if(i>_pynum){
            _pypos=new THREE.Vector3(0,0,0);
        }else{
            _pypos.copy(normal.clone().multiplyScalar(_offset+pdwidth*2)).multiplyScalar(-json.pdnum);
        }
        if(i==_pynum){
            continue;
        }
        var ver1=arr[i+1].clone().add(normal.clone().multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(_pypos); 
        var ver2=arr[i+1].clone().add(normal.clone().multiplyScalar(-pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(_pypos);
        var ver3=arr[i].clone().add(normal.clone().multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(overdistance)).add(_pypos);
        var ver4=arr[i].clone().add(normal.clone().multiplyScalar(-pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(overdistance)).add(_pypos);
        var ver5=ver1.clone().sub(new THREE.Vector3(0,tjhd,0)); 
        var ver6=ver2.clone().sub(new THREE.Vector3(0,tjhd,0));
        var ver7=ver3.clone().sub(new THREE.Vector3(0,tjhd,0));
        var ver8=ver4.clone().sub(new THREE.Vector3(0,tjhd,0));
        if(!json.addgeo.side_string){
            var _offsetl_r=pdwidth;
            if(json.pdnum>0){
                this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
                this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
                if(i==j-1||i==0||i==_pynum-1||i==_pynum+1){
                    this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
                }
                if(i==j-1||i==0){
                    this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
                }
            }else{
                this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
                this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
                if(i==j-1||i==0||i==_pynum-1||i==_pynum+1){
                    this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(ver2,ver4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r)));
                }
                if(i==j-1||i==0){
                    this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(ver1,ver3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(_offsetl_r*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
                }
            }
        }
        this.JSQEX_vertices.push(
            ver1,ver2,ver3,ver4,ver5,ver6,ver7,ver8
        )
        var pdarrr=[ver1,ver2,ver3,ver4,ver5,ver6,ver7,ver8];
        var min_max1=this.JSQEX_computeBoundingBox(pdarrr);
        if(i==j-1){
            this.JSQEX_jdpoints=[];
            this.JSQEX_jdpoints.push(ver1,ver2);
        }
        //上面
        var _arr=[
            [0+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
            [2+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:0,scale:i>=_pynum?new THREE.Vector2(1,(this.layout.length2/this.layout.subsection2+this.steps.depth)/(this.layout.length1/this.layout.subsection1+this.steps.depth)):undefined});
        //上面
        if(json.tjlx.open){
            var _arr=[
                [5+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum]//下面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:0,scale:i>=_pynum?new THREE.Vector2(1,(this.layout.length2/this.layout.subsection2+this.steps.depth)/(this.layout.length1/this.layout.subsection1+this.steps.depth)):undefined}); 
            var _arr=[
                [0+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum],
                [4+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum],//左面
                [3+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum],
                [7+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum]//右面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:2,scale:i>=_pynum?new THREE.Vector2((this.layout.length2/this.layout.subsection2+this.steps.depth)/(this.layout.length1/this.layout.subsection1+this.steps.depth),1):undefined});
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],//前面
                [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum],
                [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum]//后面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1});
        }
        if(json.tjlx.close||json.tjlx.floor){
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum]//前面
            ] 
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1}); 
        }
        this.JSQEX_verticesnum+=8;
    }
    var i=json.addplatform;
    var fxver=new THREE.Vector3().subVectors(arr[i-1],arr[i]);
    var normal=this.JSQEX_Getnormal(fxver);
    var mrhd=tjhd;
    if(json.tjlx.close){
        this.paltform.depth=0;
        mrhd=perheight+this.paltform.depth>perheight*(_pynum+1)?perheight*(_pynum+1):perheight+this.paltform.depth;
    }
    if(json.tjlx.floor){
        mrhd=allheight;
    }
    var cxwidth,pyl_r;
    if(json.addgeo.side_string){
        cxwidth=this.side_string.width;
        pyl_r=cxwidth/2;
    }else{
        cxwidth=0;
        pyl_r=pdwidth*this.JSQEX_Railingoffset.l_r;
    }
    if(json.pdnum<0){
        var ver1=arr[i].clone().add(normal.clone().multiplyScalar(3*pdwidth+_offset+cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(-this.paltform.width)); 
        var ver2=arr[i].clone().add(normal.clone().multiplyScalar(-pdwidth-cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(-this.paltform.width));
        var ver3=arr[i].clone().add(normal.clone().multiplyScalar(3*pdwidth+_offset+cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0));
        var ver4=arr[i].clone().add(normal.clone().multiplyScalar(-pdwidth-cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0));
    }else{
        var ver1=arr[i].clone().add(normal.clone().multiplyScalar(pdwidth+cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(-this.paltform.width));
        var ver2=arr[i].clone().add(normal.clone().multiplyScalar(-_offset-3*pdwidth-cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(-this.paltform.width)); 
        var ver3=arr[i].clone().add(normal.clone().multiplyScalar(pdwidth+cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0));
        var ver4=arr[i].clone().add(normal.clone().multiplyScalar(-_offset-3*pdwidth-cxwidth)).add(new THREE.Vector3(0,perheight*(i+1),0));
    }
    var _length=new THREE.Vector3().subVectors(arr[0],arr[1]).length()*this.JSQEX_Railingoffset.f_b;
    var _ver1=this.ptpoint1=ver1.clone().add(new THREE.Vector3().subVectors(ver3,ver1).normalize().multiplyScalar(_length).add(normal.clone().multiplyScalar(pyl_r).multiplyScalar(-1)));
    var _ver3=this.ptpoint3=ver3.clone().add(new THREE.Vector3().subVectors(ver1,ver3).normalize().multiplyScalar(_length).add(normal.clone().multiplyScalar(pyl_r).multiplyScalar(-1)));
    var _ver2=this.ptpoint2=ver2.clone().add(new THREE.Vector3().subVectors(ver4,ver2).normalize().multiplyScalar(_length).add(normal.clone().multiplyScalar(pyl_r)));
    var _ver4=this.ptpoint4=ver4.clone().add(new THREE.Vector3().subVectors(ver2,ver4).normalize().multiplyScalar(_length).add(normal.clone().multiplyScalar(pyl_r)));
    if(json.pdnum>0){
        this.JSQEX_armrest[1].splice(_pynum,0,_ver4,_ver2,_ver1,_ver3); 
        this.JSQEX_armrest[3].splice(1,0,_ver4,_ver2,_ver1,_ver3);
    }else{
        this.JSQEX_armrest[1].splice(_pynum,0,_ver3,_ver1,_ver2,_ver4);
        this.JSQEX_armrest[3].splice(1,0,_ver3,_ver1,_ver2,_ver4); 
    }
    // this.JSQEX_armrest[1].splice(_pynum+1,0,ver3,ver1,ver2,ver4)
    // this.JSQEX_armrest[2].push(ver3,ver1,ver2,ver4);
    // if(_offset>0){
    //     var dir=new THREE.Vector3().subVectors(ver4,ver3).normalize();
    //     this.JSQEX_armrest[0].splice(_pynum+1,0,dir.clone().multiplyScalar(pdwidth*2).add(ver3))
    //     // this.JSQEX_armrest[3].push(dir.clone().multiplyScalar(pdwidth*2).add(ver3),dir.clone().multiplyScalar(pdwidth*2+_offset).add(ver3));
    // }
    var ver5=ver1.clone().sub(new THREE.Vector3(0,mrhd,0)); 
    var ver6=ver2.clone().sub(new THREE.Vector3(0,mrhd,0));
    var ver7=ver3.clone().sub(new THREE.Vector3(0,mrhd,0));
    var ver8=ver4.clone().sub(new THREE.Vector3(0,mrhd,0));
    var _arr=[ver1,ver2,ver3,ver4,ver5,ver6,ver7,ver8];
    this.JSQEX_pdyval(_arr,pdyval);
    this.JSQEX_vertices.push(
    ver1,ver2,ver3,ver4,ver5,ver6,ver7,ver8
    )
    var _arr=[
    [0+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
    [2+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
    [5+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum],
    [7+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum]
    ]
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:9 });
    var _arr=[
    [0+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
    [4+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
    [3+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
    [7+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
    ]
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:11});
    var _arr=[
    [2+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum],
    [6+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum],
    [1+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 0+ this.JSQEX_verticesnum],
    [5+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 0+ this.JSQEX_verticesnum]
    ];
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:10});
    this.JSQEX_verticesnum+=8;
    if(json.addgeo.support_beam||!json.tjlx.open){//判断是否显示支持梁
        if(json.tjlx.open){//显示开放模式超出的支持梁
            this.JSQEX_Addsupport_beam(json,json.arr2);
        }
        this.JSQEX_Addsupport_beam(json);
    }
    if(json.addgeo.side_string){//判断是否显示侧弦
        this.JSQEX_armrest[0]=[];
        this.JSQEX_armrest[1]=[];
        this.JSQEX_armrest[2]=[];
        this.JSQEX_armrest[3]=[];
        this.JSQEX_Addside_string(json);
    }   
}

JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_Addsupport_beam = function(json,_arrpt){
    var min_maxL,min_maxR,min_maxB,min_maxL2,min_maxR2,min_maxB2,Cal_vertice=[];
    var pdLeft1=[],pdRight1=[],pdBottom1=[],pdLeft2=[],pdRight2=[],pdBottom2=[];
    var arr=_arrpt!=undefined?_arrpt:json.arr;
    var tjhd=this.steps.thickness;
    var allheight=this.step.height;
    var overdistance=this.steps.depth;
    var zclheight=this.support_beam.depth;
    var pdwidth=this.layout.width/2;
    var perheight=allheight/(json.num);
    var _offset=this.layout.offset;
    var _pynum=json.pynum||this.steps.subsection;
    var _pypos=new THREE.Vector3(0,0,0);
    var pdyval=0;
    var pyy=new THREE.Vector3(0,0,0);
    var _widthzcl=this.support_beam.width/2;
    var _uvlx=this.JSQEX_uvlx;
    if(this.tjlx.close||this.tjlx.floor){
        tjhd=0;
        overdistance=this.steps.depth=0;
        _widthzcl=pdwidth;
        this.support_beam.width=_widthzcl*2;
        zclheight=perheight-tjhd;
        this.support_beam.depth=perheight;
    }else{
        tjhd=this.mrsteps.thickness;
        overdistance=this.mrsteps.depth;
        zclheight=this.support_beam.depth=this.mrsupport_beam.depth;
        this.support_beam.width=this.mrsupport_beam.width;
        _widthzcl=this.support_beam.width/2;
    }
    if(this.tjlx.floor){
        zclheight=allheight;
        this.support_beam.depth=allheight;
    }
    if(_arrpt!=undefined){
        var fxver=new THREE.Vector3().subVectors(json.arr[0],json.arr[1]);
        var normal=this.JSQEX_Getnormal(fxver);
        if(this.JSQEX_object_type.utype){
            _pypos.copy(normal.clone().multiplyScalar(_offset+pdwidth*2)).multiplyScalar(-json.pdnum);
        }
        var v1=json.arr[0+1].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(_pypos); 
        var v2=json.arr[0+1].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(_pypos);
        var v3=json.arr[0].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(_pypos);
        var v4=json.arr[0].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(_pypos);
        var v5=v1.clone().sub(new THREE.Vector3(0,zclheight,0)); 
        var v6=v2.clone().sub(new THREE.Vector3(0,zclheight,0));
        var v7=v3.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        var v8=v4.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        var _arr=[v1,v2,v3,v4,v5,v6,v7,v8];
        this.JSQEX_pdyval(_arr,0);
        pdLeft1.push(v1,v3,v5,v7);
        pdRight1.push(v2,v4,v6,v8);
        pdBottom1.push(v5,v6,v7,v8);
    }
    for(var i=0,j=arr.length-1;i<j;i++){
        var fxver=new THREE.Vector3().subVectors(arr[0],arr[1]);
        if(i>=_pynum+1){
            fxver=new THREE.Vector3().subVectors(arr[_pynum+1],arr[_pynum+2]);
        }
        var normal=this.JSQEX_Getnormal(fxver);
        var v1=null,v2=null,v3=null,v4=null,v5=null,v6=null,v7=null,v8=null,v9=null,v10=null;
        if(i>=_pynum+1){
            _pypos=new THREE.Vector3(0,0,0);
            if(this.JSQEX_object_type.ltype){//L型楼梯
                _pypos=new THREE.Vector3(0,0,0)
            }
            pdyval=perheight*(_pynum+1);
            if(json.tjlx.floor){
                pdyval=0;
            }
        }else if(i<_pynum+1){
            pdyval=0;
            if(this.JSQEX_object_type.utype){
                _pypos.copy(normal.clone().multiplyScalar(_offset+pdwidth*2)).multiplyScalar(-json.pdnum);
            }
        }
        if(_arrpt!=undefined){
            pyy.add(new THREE.Vector3(0,_pynum*perheight,0));
        }
        if(i==_pynum){
            continue;
        }
        v1=arr[i+1].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0)).add(_pypos).add(pyy); 
        v2=arr[i+1].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0)).add(_pypos).add(pyy);
        v3=arr[i].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0)).add(_pypos).add(pyy);
        v4=arr[i].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(i+1)-tjhd,0)).add(_pypos).add(pyy);
        v5=v1.clone().sub(new THREE.Vector3(0,zclheight,0)); 
        v6=v2.clone().sub(new THREE.Vector3(0,zclheight,0));
        v7=v3.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        v8=v4.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        var _arr=[v1,v2,v3,v4,v5,v6,v7,v8];
        str=(perheight*i-tjhd-pdyval<=zclheight&&zclheight<=perheight*(i+1)-tjhd-pdyval&&i<=_pynum)||(perheight*i-tjhd-pdyval<=zclheight&&zclheight<=perheight*(i+1)-tjhd-pdyval&&i>_pynum);
        if(str&&json.tjlx.open){
            overlong=fxver.clone().normalize().multiplyScalar(-1).multiplyScalar((tjhd+zclheight)/(perheight/fxver.length()));
            v9=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(_widthzcl)).add(_pypos).add(pyy);
            v10=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(-_widthzcl)).add(_pypos).add(pyy);
            if(i>=_pynum+1){
                v9=arr[_pynum+1].clone().add(new THREE.Vector3(0,perheight*(_pynum)+tjhd,0)).add(overlong).add(normal.clone().multiplyScalar(_widthzcl)).add(_pypos);
                v10=arr[_pynum+1].clone().add(new THREE.Vector3(0,perheight*(_pynum)+tjhd,0)).add(overlong).add(normal.clone().multiplyScalar(-_widthzcl)).add(_pypos);
            }
            _arr.push(v9,v10);

         } 
        this.JSQEX_pdyval(_arr,pdyval);
        this.JSQEX_vertices.push(
            v1,v2,v3,v4,v5,v6,v7,v8
        )   
        if(v9!=null){
            this.JSQEX_vertices.push(v9,v10)
        }
        if(i>=_pynum){
            pdLeft2.push(v1,v3,v5,v7);
            pdRight2.push(v2,v4,v6,v8);
            pdBottom2.push(v5,v6,v7,v8);
        }else{
            pdLeft1.push(v1,v3,v5,v7);
            pdRight1.push(v2,v4,v6,v8);
            pdBottom1.push(v5,v6,v7,v8);
        }
        Cal_vertice.push([v1,v2,v3,v4,v5,v6,v7,v8,v9,v10]);
        this.JSQEX_pdyval(Cal_vertice,pdyval);
    }
    //兼容开放模式 超出的支撑梁
    if(_arrpt==undefined&&json.tjlx.open){
        var fxver=new THREE.Vector3().subVectors(json.arr2[0],json.arr2[1]);
        var normal=this.JSQEX_Getnormal(fxver);
        if(this.JSQEX_object_type.utype){
            _pypos.copy(normal.clone().multiplyScalar(_offset+pdwidth*2)).multiplyScalar(-json.pdnum);
        }
        var v1=json.arr2[0+1].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(new THREE.Vector3(0,_pynum*perheight,0)).add(_pypos); 
        var v2=json.arr2[0+1].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(new THREE.Vector3(0,_pynum*perheight,0)).add(_pypos);
        var v3=json.arr2[0].clone().add(normal.clone().multiplyScalar(_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(new THREE.Vector3(0,_pynum*perheight,0)).add(_pypos);
        var v4=json.arr2[0].clone().add(normal.clone().multiplyScalar(-_widthzcl)).add(new THREE.Vector3(0,perheight*(0+1)-tjhd,0)).add(new THREE.Vector3(0,_pynum*perheight,0)).add(_pypos);
        var v5=v1.clone().sub(new THREE.Vector3(0,zclheight,0)); 
        var v6=v2.clone().sub(new THREE.Vector3(0,zclheight,0));
        var v7=v3.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        var v8=v4.clone().sub(new THREE.Vector3(0,perheight+zclheight,0));
        var _arr=[v1,v2,v3,v4,v5,v6,v7,v8];
        this.JSQEX_pdyval(_arr,0);
        pdLeft1.push(v1,v3,v5,v7);
        pdRight1.push(v2,v4,v6,v8);
        pdBottom1.push(v5,v6,v7,v8);
    }
    //兼容开放模式 超出的支撑梁
    min_maxL=this.JSQEX_computeBoundingBox(pdLeft1);
    min_maxR=this.JSQEX_computeBoundingBox(pdRight1);
    min_maxB=this.JSQEX_computeBoundingBox2(pdBottom1);
    // var _pdheight,_pdheight2,_pdheight3;
    var _pdheight=zclheight>perheight*(this.layout.subsection1+1)-tjhd?perheight*(this.layout.subsection1+1)-tjhd:perheight+zclheight;
    if(this.tjlx.floor){
        _pdheight=perheight*_pynum;
    }
    for(var i=0,j=Cal_vertice.length;i<j;i++){
        if(i>=_pynum){
            min_maxL2=this.JSQEX_computeBoundingBox(pdLeft2);
            min_maxR2=this.JSQEX_computeBoundingBox(pdRight2);
            min_maxB2=this.JSQEX_computeBoundingBox2(pdBottom2);
            min_maxL=min_maxL2;
            min_maxR=min_maxR2;
            min_maxB=min_maxB2;
            if(this.JSQEX_object_type.ltype&&(this.layout.angle==90||this.layout.angle==-90)){
                if(this.JSQEX_uvlx==99){
                    _uvlx=99;
                }else{
                    _uvlx=3;
                }   
            } 
        }else{
            if(this.JSQEX_object_type.ltype&&(this.layout.angle==90||this.layout.angle==-90)){
                if(this.JSQEX_uvlx==99){
                    _uvlx=3;
                }else{
                    _uvlx=99;
                }   
            } 
        }
        if(Cal_vertice[i][9]!=null){
            if(i==j-1||i==json.addplatform-1){//最后一阶后面
                var _arr=[
                    [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum],
                    [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum]
                ]
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            }
            //左面
            var _arr=[
                [0+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
                [4+ this.JSQEX_verticesnum, 8+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL,min_max2:min_maxL,materialInd:5,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/(this.tjlx.open?(this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1)):this.layout.length1),(this.tjlx.floor?allheight:perheight*this.layout.subsection2-tjhd)/(perheight*(this.tjlx.open?this.layout.subsection1+1:this.layout.subsection1)-tjhd)):undefined,uvlx:_uvlx});
            //左面
            //右面
            var _arr=[
                [3+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
                [9+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR,min_max2:min_maxR,materialInd:5,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/(this.tjlx.open?(this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1)):this.layout.length1),(this.tjlx.floor?allheight:perheight*this.layout.subsection2-tjhd)/(perheight*(this.tjlx.open?this.layout.subsection1+1:this.layout.subsection1)-tjhd)):undefined,uvlx:_uvlx});
            //右面
            //下面
            var _arr=[
                [6+this.JSQEX_verticesnum, 8+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum],
                [8+this.JSQEX_verticesnum, 9+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum],
                [8+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,9+this.JSQEX_verticesnum],
                [4+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,9+this.JSQEX_verticesnum]
            ]
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB,materialInd:3,scale:i>=_pynum?new THREE.Vector2(1,this.tjlx.open?this.layout.length2/(this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1)):this.layout.length2/this.layout.length1):undefined});
            //下面
            //开放状态 则添加前面
            if(json.tjlx.open){
                 var _arr=[
                    [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum],
                    [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum]
                ]
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            }
            //开放状态 则添加前面    
            this.JSQEX_verticesnum+=10;
        }else{
            if(i==j-1||i==json.addplatform-1){//最后一阶后面
                var _arr=[
                    [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum],
                    [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,0+this.JSQEX_verticesnum]
                ]
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            }
            //左面
            var _arr=[
                [0+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
                [4+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL,min_max2:min_maxL,materialInd:5,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/(this.tjlx.open?(this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1)):this.layout.length1),(this.tjlx.floor?allheight:perheight*this.layout.subsection2-tjhd)/(perheight*(this.tjlx.open?this.layout.subsection1+1:this.layout.subsection1)-tjhd)):undefined,uvlx:_uvlx});
            //左面
            //右面
            var _arr=[
                [3+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR,min_max2:min_maxR,materialInd:5,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/(this.tjlx.open?(this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1)):this.layout.length1),(this.tjlx.floor?allheight:perheight*this.layout.subsection2-tjhd)/(perheight*(this.tjlx.open?this.layout.subsection1+1:this.layout.subsection1)-tjhd)):undefined,uvlx:_uvlx});
            //右面
            //下面
            var _arr=[
                [6+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum],
                [4+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum,7+this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB,materialInd:3,scale:i>=_pynum?new THREE.Vector2(1,this.tjlx.open?this.layout.length2/(this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1)):this.layout.length2/this.layout.length1):undefined});
            //下面
            //开放状态 则添加前面
            if(json.tjlx.open){
                 var _arr=[
                    [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum],
                    [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum,3+this.JSQEX_verticesnum]
                ]
                this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:4,allheight:_pdheight});
            }
            //开放状态 则添加前面    
            this.JSQEX_verticesnum+=8;
        }
        //开放/闭合 支撑梁
    } 
}

JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_Addside_string = function(json){
    var min_maxL1,min_maxR1,min_maxB1,min_maxT1,min_maxL2,min_maxR2,min_maxB2,min_maxT2,Cal_vertice=[];
    var pdLeft11=[],pdRight11=[],pdBottom11=[],pdTop11=[],pdLeft21=[],pdRight21=[],pdBottom21=[],pdTop21=[],pdLeft12=[],pdRight12=[],pdBottom12=[],pdTop12=[],pdLeft22=[],pdRight22=[],pdBottom22=[],pdTop22=[];
    var arr=json.arr;
    var tjhd=json.steps.thickness;
    var allheight=json.step.height;
    var overdistance=json.steps.depth;
    var cxwidth=json.side_string.width;
    var zclheight=json.support_beam.depth;
    var pdwidth=json.layout.width/2;
    var _offset=json.layout.offset;
    var sidehd2=json.side_string.depth;
    var perheight=allheight/(json.num);
    var _pynum=json.pynum||json.steps.subsection;
    var _pypos=new THREE.Vector3(0,0,0);
    var pdyval=0;
    var _widthzcl=json.support_beam.width/2;
    var _uvlx=this.JSQEX_uvlx;
    for(var i=0,j=arr.length-1;i<j;i++){
        var v1=null,v2=null,v3=null,v4=null,v5=null,v6=null,v7=null,v8=null,v9=null,v10=null,v11=null,v12=null,v13=null,v14=null,v15=null,v16=null,v17=null,v18=null,v19=null,v20=null;
        var fxver=new THREE.Vector3().subVectors(arr[i],arr[i+1]);
        var _num=i+1;
        var _cxpynum=new THREE.Vector3(0,1,0).multiplyScalar(json.side_string.offset);
        var normal=this.JSQEX_Getnormal(fxver);
        if(i>=_pynum+1){
            pdyval=perheight*(_pynum+1);
            _pypos=new THREE.Vector3(0,0,0);
            if(this.JSQEX_object_type.ltype){//L型楼梯
                _pypos=new THREE.Vector3(0,0,0)
            }
        }else if(i<_pynum+1){
            pdval=0;
            if(this.JSQEX_object_type.utype){
                _pypos.copy(normal.clone().multiplyScalar(_offset+pdwidth*2)).multiplyScalar(-json.pdnum);
            }
        }
        if(i==_pynum){
            continue;
        }
        //左边栏上面
        v1=arr[_num].clone().add(normal.clone().multiplyScalar(pdwidth+cxwidth)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum).add(_pypos);
        v2=arr[_num].clone().add(normal.clone().multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum).add(_pypos);
        v3=arr[i].clone().add(normal.clone().multiplyScalar(pdwidth+cxwidth)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum).add(_pypos);
        v4=arr[i].clone().add(normal.clone().multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum).add(_pypos);
        //右边栏上面
        v5=arr[_num].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum).add(_pypos);
        v6=arr[_num].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth+cxwidth)).add(new THREE.Vector3(0,perheight*(_num+1),0)).add(_cxpynum).add(_pypos);
        v7=arr[i].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum).add(_pypos);
        v8=arr[i].clone().add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth+cxwidth)).add(new THREE.Vector3(0,perheight*_num,0)).add(_cxpynum).add(_pypos);
        //左边栏下面
        v9=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v1.clone());
        v10=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v2.clone());
        v11=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v3.clone());
        v12=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v4.clone());
        //右边栏下面
        v13=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v5.clone());
        v14=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v6.clone());
        v15=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v7.clone());
        v16=new THREE.Vector3(0,-1,0).multiplyScalar(sidehd2).add(v8.clone());
        if(json.pdnum>0){
            this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
            this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
            if(json.object_type.utype){
                if(i==j-1||i==0||i==_pynum-1||i==_pynum+1){
                    this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                }
                if(i==j-1||i==0){
                    this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                }
            }
            if(json.object_type.ltype){
                if(i==j-1||i==0||i==_pynum-1||i==_pynum+1){
                    this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                    this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                }
            }
            
        }else{
            this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
            this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
            if(json.object_type.utype){
                if(i==j-1||i==0||i==_pynum-1||i==_pynum+1){
                    this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                }
                if(i==j-1||i==0){
                    this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                }
            }
            if(json.object_type.ltype){
                if(i==j-1||i==0||i==_pynum-1||i==_pynum+1){
                    this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v5,v7).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                    this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(cxwidth*.5).multiplyScalar(-1)));
                }
            }
            
        }
        var _arr=[v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16];
        this.JSQEX_pdyval(_arr,pdyval);
        this.JSQEX_vertices.push(
            v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16
        )
        var str=(perheight*(i+1)+json.side_string.offset-pdyval<=json.side_string.depth&&json.side_string.depth<=perheight*(i+2)+json.side_string.offset-pdyval&&i<=_pynum||i>_pynum&&perheight*(i+1)+json.side_string.offset-pdyval<=json.side_string.depth&&json.side_string.depth<=perheight*(i+2)+json.side_string.offset-pdyval);
        if(str){
            var overlong=fxver.clone().normalize().multiplyScalar(-1).multiplyScalar((json.side_string.depth-json.side_string.offset-perheight)/(perheight/fxver.length()));
            v17=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(pdwidth+cxwidth)).add(_pypos);
            v18=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(pdwidth)).add(_pypos);
            v19=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth)).add(_pypos);
            v20=arr[0].clone().add(overlong).add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth+cxwidth)).add(_pypos);
            if(i>=_pynum+1){
                v17=arr[_pynum+1].clone().add(new THREE.Vector3(0,perheight*(_pynum+1),0)).add(overlong).add(normal.clone().multiplyScalar(pdwidth+cxwidth)).add(_pypos);
                v18=arr[_pynum+1].clone().add(new THREE.Vector3(0,perheight*(_pynum+1),0)).add(overlong).add(normal.clone().multiplyScalar(pdwidth)).add(_pypos);
                v19=arr[_pynum+1].clone().add(new THREE.Vector3(0,perheight*(_pynum+1),0)).add(overlong).add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth)).add(_pypos);
                v20=arr[_pynum+1].clone().add(new THREE.Vector3(0,perheight*(_pynum+1),0)).add(overlong).add(normal.clone().multiplyScalar(-1).multiplyScalar(pdwidth+cxwidth)).add(_pypos);
            }
            var _arr=[v17,v18,v19,v20];
            this.JSQEX_pdyval(_arr,pdyval);
            this.JSQEX_vertices.push(
                v17,v18,v19,v20
            )
        }
        if(i<_pynum){
            pdLeft11.push(v1,v3,v9,v11);
            pdRight11.push(v2,v4,v10,v12);
            pdTop11.push(v1,v2,v3,v4);
            pdBottom11.push(v9,v10,v11,v12);
            pdLeft21.push(v5,v7,v13,v15);
            pdRight21.push(v6,v8,v14,v16);
            pdTop21.push(v5,v6,v7,v8);
            pdBottom21.push(v13,v14,v15,v16);
        }else{
            pdLeft12.push(v1,v3,v9,v11);
            pdRight12.push(v2,v4,v10,v12);
            pdTop12.push(v1,v2,v3,v4)
            pdBottom12.push(v9,v10,v11,v12);
            pdLeft22.push(v5,v7,v13,v15);
            pdRight22.push(v6,v8,v14,v16);
            pdTop22.push(v5,v6,v7,v8);
            pdBottom22.push(v13,v14,v15,v16);
        }
        Cal_vertice.push([v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20]);
        if(i==j-1){
            this.JSQEX_jdpoints=[];
            this.JSQEX_jdpoints.push(v1,v6);
        }      
    }
    min_maxL1=this.JSQEX_computeBoundingBox(pdLeft11);
    min_maxR1=this.JSQEX_computeBoundingBox(pdRight11);
    min_maxB1=this.JSQEX_computeBoundingBox2(pdBottom11);
    min_maxT1=this.JSQEX_computeBoundingBox2(pdTop11);
    min_maxL2=this.JSQEX_computeBoundingBox(pdLeft21);
    min_maxR2=this.JSQEX_computeBoundingBox(pdRight21);
    min_maxB2=this.JSQEX_computeBoundingBox2(pdBottom21);
    min_maxT2=this.JSQEX_computeBoundingBox2(pdTop21);
    var _pdheight=this.side_string.depth>perheight*(this.layout.subsection1+1)?perheight*(this.layout.subsection1+1):this.side_string.depth;
    for(var i=0,j=Cal_vertice.length;i<j;i++){
        if(i>=_pynum){
            min_maxL1=this.JSQEX_computeBoundingBox(pdLeft12);
            min_maxR1=this.JSQEX_computeBoundingBox(pdRight12);
            min_maxB1=this.JSQEX_computeBoundingBox2(pdBottom12);
            min_maxT1=this.JSQEX_computeBoundingBox2(pdTop12);
            min_maxL2=this.JSQEX_computeBoundingBox(pdLeft22);
            min_maxR2=this.JSQEX_computeBoundingBox(pdRight22);
            min_maxB2=this.JSQEX_computeBoundingBox2(pdBottom22);
            min_maxT2=this.JSQEX_computeBoundingBox2(pdTop22);
            if(this.JSQEX_object_type.ltype&&(this.layout.angle==90||this.layout.angle==-90)){
                if(this.JSQEX_uvlx==99){
                    _uvlx=99;
                }else{
                    _uvlx=3;
                }   
            } 
        }else{
            if(this.JSQEX_object_type.ltype&&(this.layout.angle==90||this.layout.angle==-90)){
                if(this.JSQEX_uvlx==99){
                    _uvlx=3;
                }else{
                    _uvlx=99;
                }   
            } 
        }
        if(i==0||i==json.addplatform){
            var _arr=[
                [2+ this.JSQEX_verticesnum, 10+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum],
                [10+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:_pdheight});
            var _arr=[
                [6+ this.JSQEX_verticesnum, 14+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum],
                [14+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:_pdheight});
        }
        if(i==j-1||i==json.addplatform-1){
            var _arr=[
                [1+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum,0+ this.JSQEX_verticesnum],
                [9+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,0+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:_pdheight});
            var _arr=[
                [5+ this.JSQEX_verticesnum, 13+ this.JSQEX_verticesnum,4+ this.JSQEX_verticesnum],
                [13+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,4+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:6,arr:_arr,materialInd:7,allheight:_pdheight});
        }
        //左上
        var _arr=[
            [0+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
            [2+ this.JSQEX_verticesnum,3+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxT1,materialInd:6,scale:i>=_pynum?new THREE.Vector2(1,this.layout.length2/this.layout.length1):undefined});
        //右上
        var _arr=[
            [4+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
            [6+ this.JSQEX_verticesnum,7+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxT2,materialInd:6,scale:i>=_pynum?new THREE.Vector2(1,this.layout.length2/this.layout.length1):undefined});
        if(Cal_vertice[i][19]!=null){
            //左下
            var _arr=[
                [10+ this.JSQEX_verticesnum,16+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum],
                [16+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum],
                [16+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB1,materialInd:6,scale:i>=_pynum?new THREE.Vector2(1,this.layout.length2/this.layout.length1):undefined});
            //左左
            var _arr=[
                [0+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,16+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum],
                [16+ this.JSQEX_verticesnum,10+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL1,min_max2:min_maxL1,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            //左右
            var _arr=[
                [3+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
                [11+ this.JSQEX_verticesnum,17+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
                [17+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR1,min_max2:min_maxR1,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            //右下
            var _arr=[
                [14+ this.JSQEX_verticesnum,18+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum],
                [18+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum],
                [18+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB2,materialInd:6,scale:i>=_pynum?new THREE.Vector2(1,this.layout.length2/this.layout.length1):undefined});
            //右左
            var _arr=[
                [4+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,18+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum],
                [18+ this.JSQEX_verticesnum,14+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL2,min_max2:min_maxL2,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            //右右
            var _arr=[
                [7+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
                [15+ this.JSQEX_verticesnum,19+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
                [19+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR2,min_max2:min_maxR2,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            this.JSQEX_verticesnum+=20;
        }else{
            //左下
            var _arr=[
                [10+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB1,materialInd:6,scale:i>=_pynum?new THREE.Vector2(1,this.layout.length2/this.layout.length1):undefined});
            //左左
            var _arr=[
                [0+ this.JSQEX_verticesnum,8+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum],
                [8+ this.JSQEX_verticesnum,10+ this.JSQEX_verticesnum,2+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL1,min_max2:min_maxL1,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            //左右
            var _arr=[
                [3+ this.JSQEX_verticesnum,11+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum],
                [11+ this.JSQEX_verticesnum,9+ this.JSQEX_verticesnum,1+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR1,min_max2:min_maxR1,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            //右下
            var _arr=[
                [14+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:5,arr:_arr,points:min_maxB2,materialInd:6,scale:i>=_pynum?new THREE.Vector2(1,this.layout.length2/this.layout.length1):undefined});
            //右左
            var _arr=[
                [4+ this.JSQEX_verticesnum,12+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum],
                [12+ this.JSQEX_verticesnum,14+ this.JSQEX_verticesnum,6+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxL2,min_max2:min_maxL2,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            //右右
            var _arr=[
                [7+ this.JSQEX_verticesnum,15+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum],
                [15+ this.JSQEX_verticesnum,13+ this.JSQEX_verticesnum,5+ this.JSQEX_verticesnum]
            ];
            this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_maxR2,min_max2:min_maxR2,materialInd:8,scale:i>=_pynum?new THREE.Vector2(this.layout.length2/this.layout.length1,(min_maxL2.max.y-min_maxL2.min.y)/(this.JSQEX_computeBoundingBox(pdLeft11).max.y-this.JSQEX_computeBoundingBox(pdLeft11).min.y)):undefined,uvlx:_uvlx});
            
            this.JSQEX_verticesnum+=16;
        }
    }
    if(json.object_type.utype){
        if(json.pdnum>0){
            this.JSQEX_armrest[1].splice(_pynum,0,this.ptpoint4,this.ptpoint2,this.ptpoint1,this.ptpoint3);
            this.JSQEX_armrest[3].splice(1,0,this.ptpoint4,this.ptpoint2,this.ptpoint1,this.ptpoint3);  
        }else{
            this.JSQEX_armrest[1].splice(_pynum,0,this.ptpoint3,this.ptpoint1,this.ptpoint2,this.ptpoint4);
            this.JSQEX_armrest[3].splice(1,0,this.ptpoint3,this.ptpoint1,this.ptpoint2,this.ptpoint4);  
        }
    }
    if(json.object_type.ltype){
        var _v1=this._ptpoint1.clone().add(new THREE.Vector3(0,perheight*(_pynum+1),0));
        var _v2=this._ptpoint2.clone().add(new THREE.Vector3(0,perheight*(_pynum+1),0));
        this.JSQEX_armrest[1].splice(_pynum,0,_v1);
        this.JSQEX_armrest[3].splice(2,0,_v1);
        this.JSQEX_armrest[0].splice(_pynum,0,_v2);
        this.JSQEX_armrest[2].splice(2,0,_v2);
    }
}

JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype.JSQEX_Spiralstair = function(json){
    if(this.tjlx.close||this.tjlx.floor){
        this.steps.thickness=this.step.height/json.num;
        this.steps.depth=0;
    }else{
        this.paltform.depth=this.steps.thickness=this.mrsteps.thickness;
        this.steps.depth=this.mrsteps.depth;
    }
    var arr=json.arr;
    var tjhd=this.steps.thickness;
    var allheight=this.step.height;
    var overdistance=this.steps.depth;
    var pdwidth=this.layout.width/2;
    var perheight=allheight/(json.num);
    var _pynum=json.pynum;
    var pdyval=0;
    for(var i=0,j=arr.length-1;i<j;i++){
        var fxver=new THREE.Vector3().subVectors(arr[i],arr[i+1]);
        var normal=this.JSQEX_Getnormal(fxver);
        if(i==_pynum){
            continue;
        }
        var v1=arr[i+1].clone().add(normal.clone().multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)); 
        var v2=arr[i+1].clone().add(normal.clone().multiplyScalar(-pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0));
        var v3=arr[i].clone().add(normal.clone().multiplyScalar(pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(overdistance));
        var v4=arr[i].clone().add(normal.clone().multiplyScalar(-pdwidth)).add(new THREE.Vector3(0,perheight*(i+1),0)).add(fxver.clone().normalize().multiplyScalar(overdistance));
        var v5=v1.clone().sub(new THREE.Vector3(0,tjhd,0)); 
        var v6=v2.clone().sub(new THREE.Vector3(0,tjhd,0));
        var v7=v3.clone().sub(new THREE.Vector3(0,tjhd,0));
        var v8=v4.clone().sub(new THREE.Vector3(0,tjhd,0));
        if(!json.addgeo.side_string){
            this.JSQEX_armrest[0].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(pdwidth*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
            this.JSQEX_armrest[1].push(new THREE.Vector3().addVectors(v2,v4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(pdwidth*this.JSQEX_Railingoffset.l_r)));
            if(i==j-1||i==0||i==_pynum-1||i==_pynum+1){
                this.JSQEX_armrest[2].push(new THREE.Vector3().addVectors(v1,v3).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(pdwidth*this.JSQEX_Railingoffset.l_r).multiplyScalar(-1)));
                this.JSQEX_armrest[3].push(new THREE.Vector3().addVectors(v2,v4).multiplyScalar(this.JSQEX_Railingoffset.f_b).add(normal.clone().multiplyScalar(pdwidth*this.JSQEX_Railingoffset.l_r)));
            }
        }
        this.JSQEX_vertices.push(
            v1,v2,v3,v4,v5,v6,v7,v8
        )
        var pdarrr=[v1,v2,v3,v4,v5,v6,v7,v8];
        var min_max1=this.JSQEX_computeBoundingBox(pdarrr);
        if(i==j-1){
            this.JSQEX_jdpoints=[];
            this.JSQEX_jdpoints.push(v1,v2);
        }
        //上面
        var _arr=[
            [0+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
            [2+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
        ];
        this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:0,scale:i>=_pynum?new THREE.Vector2(1,(this.layout.length2/this.layout.subsection2+this.steps.depth)/(this.layout.length1/this.layout.subsection1+this.steps.depth)):undefined});
        //上面
        if(json.tjlx.open){
            var _arr=[
                [5+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum],
                [7+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum]//下面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:0,scale:i>=_pynum?new THREE.Vector2(1,(this.layout.length2/this.layout.subsection2+this.steps.depth)/(this.layout.length1/this.layout.subsection1+this.steps.depth)):undefined});
            var _arr=[
                [0+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum],
                [4+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 2+this.JSQEX_verticesnum],//左面
                [3+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum],
                [7+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 1+this.JSQEX_verticesnum]//右面
            ];
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:2,scale:i>=_pynum?new THREE.Vector2((this.layout.length2/this.layout.subsection2+this.steps.depth)/(this.layout.length1/this.layout.subsection1+this.steps.depth),1):undefined}); 
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],//前面
                [1+this.JSQEX_verticesnum, 5+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum],
                [5+this.JSQEX_verticesnum, 4+this.JSQEX_verticesnum, 0+this.JSQEX_verticesnum]//后面
            ]
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1});
        }
        if(json.tjlx.close||json.tjlx.floor){
            var _arr=[
                [2+this.JSQEX_verticesnum, 6+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum],
                [6+this.JSQEX_verticesnum, 7+this.JSQEX_verticesnum, 3+this.JSQEX_verticesnum]//前面
            ] 
            this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:1}); 
        }
        this.JSQEX_verticesnum+=8;
    }
    var i=json.addplatform;
    var fxver=new THREE.Vector3().subVectors(arr[i-1],arr[i]);
    var normal=this.JSQEX_Getnormal(fxver);
    var mrhd=tjhd;
    if(json.tjlx.close){
        this.paltform.depth=0;
        mrhd=perheight+this.paltform.depth>perheight*(_pynum+1)?perheight*(_pynum+1):perheight+this.paltform.depth;
    }
    if(json.tjlx.floor){
        mrhd=allheight;
    }
    var v1=this.ptpoint1.clone().add(new THREE.Vector3(0,perheight*(i+1),0));
    var v2=this.ptpoint2.clone().add(new THREE.Vector3(0,perheight*(i+1),0));
    var v3=this.ptpoint3.clone().add(new THREE.Vector3(0,perheight*(i+1),0));
    var v4=this.ptpoint4.clone().add(new THREE.Vector3(0,perheight*(i+1),0));
    var v5=this.ptpoint5.clone().add(new THREE.Vector3(0,perheight*(i+1),0));
    var v6=v1.clone().sub(new THREE.Vector3(0,mrhd,0)); 
    var v7=v2.clone().sub(new THREE.Vector3(0,mrhd,0));
    var v8=v3.clone().sub(new THREE.Vector3(0,mrhd,0));
    var v9=v4.clone().sub(new THREE.Vector3(0,mrhd,0));
    var v10=v5.clone().sub(new THREE.Vector3(0,mrhd,0));
    var _length=new THREE.Vector3().subVectors(arr[0],arr[1]).length()*this.JSQEX_Railingoffset.f_b;
    var pyl_r;
    if(json.addgeo.side_string){
        pyl_r=this.side_string.width/2;
    }else{
        pyl_r=pdwidth*this.JSQEX_Railingoffset.l_r;
    }
    var _v1=this._ptpoint1.clone().add(new THREE.Vector3(0,perheight*(i+1),0));
    var _v2=this._ptpoint2.clone().add(new THREE.Vector3(0,perheight*(i+1),0));
    this.JSQEX_armrest[1].splice(_pynum,0,_v1);
    this.JSQEX_armrest[3].splice(2,0,_v1);
    this.JSQEX_armrest[0].splice(_pynum,0,_v2);
    this.JSQEX_armrest[2].splice(2,0,_v2);
    var _arr=[v1,v2,v3,v4,v5,v6,v7,v8,v9,v10];
    this.JSQEX_pdyval(_arr,pdyval);
    this.JSQEX_vertices.push(
    v1,v2,v3,v4,v5,v6,v7,v8,v9,v10
    )
    var _arr=[
    [0+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
    [2+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
    [3+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
    [8+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum],
    [7+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum],
    [5+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum]
    ]
    var pdarrr=[v1,v2,v3,v4,v5,v6,v7,v8,v9,v10];
    var min_max1=this.JSQEX_computeBoundingBox(pdarrr);
    this.JSQEX_changefaceVertexUvs({lx:2,arr:_arr,min_max1:min_max1,min_max2:min_max1,uvlx:2,materialInd:9});
    var _arr=[ 
    [0+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum],
    [5+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 2+ this.JSQEX_verticesnum]
    ]
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:10});
    var _arr=[
    [2+ this.JSQEX_verticesnum, 7+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum],
    [7+ this.JSQEX_verticesnum, 8+ this.JSQEX_verticesnum, 3+ this.JSQEX_verticesnum]
    ]
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:10,scale:new THREE.Vector2(new THREE.Vector3().subVectors(this.ptpoint3,this.ptpoint4).length()/new THREE.Vector3().subVectors(this.ptpoint1,this.ptpoint3).length(),1)});
    var _arr=[
    [3+ this.JSQEX_verticesnum, 8+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum],
    [8+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum, 4+ this.JSQEX_verticesnum]
    ]
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:10,scale:new THREE.Vector2(new THREE.Vector3().subVectors(this.ptpoint4,this.ptpoint5).length()/new THREE.Vector3().subVectors(this.ptpoint1,this.ptpoint3).length(),1)});
    var _arr=[
    [4+ this.JSQEX_verticesnum, 9+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum],
    [9+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 1+ this.JSQEX_verticesnum]
    ]
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:10,scale:new THREE.Vector2(new THREE.Vector3().subVectors(this.ptpoint2,this.ptpoint5).length()/new THREE.Vector3().subVectors(this.ptpoint1,this.ptpoint3).length(),1)});
    var _arr=[
    [1+ this.JSQEX_verticesnum, 6+ this.JSQEX_verticesnum, 0+ this.JSQEX_verticesnum],
    [6+ this.JSQEX_verticesnum, 5+ this.JSQEX_verticesnum, 0+ this.JSQEX_verticesnum]
    ];
    this.JSQEX_changefaceVertexUvs({lx:1,arr:_arr,materialInd:10,scale:new THREE.Vector2(new THREE.Vector3().subVectors(this.ptpoint1,this.ptpoint2).length()/new THREE.Vector3().subVectors(this.ptpoint1,this.ptpoint3).length(),1)});
    this.JSQEX_verticesnum+=10;   
    if(json.addgeo.support_beam||!json.tjlx.open){//判断是否显示支持梁
        if(json.tjlx.open){//显示开放模式超出的支持梁
            this.JSQEX_Addsupport_beam(json,json.arr2);
        }
        this.JSQEX_Addsupport_beam(json);
    }
    
    if(json.addgeo.side_string){//判断是否显示侧弦
        this.JSQEX_armrest[0]=[];
        this.JSQEX_armrest[1]=[];
        this.JSQEX_armrest[2]=[];
        this.JSQEX_armrest[3]=[];
        this.JSQEX_Addside_string(json);
    }
} 

JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype.JSQEX_Addsupport_beam=JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_Addsupport_beam;
JSQEXBasicStructure.JSQEX_Stair_Ltype.prototype.JSQEX_Addside_string=JSQEXBasicStructure.JSQEX_Stair_Utype.prototype.JSQEX_Addside_string;
JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_computeBoundingBox2=function(points,num,lxnum) {
    var point1,point2,point3,point4,il=points.length;
    point1=points[il-4].clone().setY(0);
    point2=points[il-3].clone().setY(0);
    point3=points[2].clone().setY(0);
    point4=points[3].clone().setY(0);
    if(num>0&&(lxnum!=3)){//设置上下面uv坐标范围
        point1=new THREE.Vector3().subVectors(point1,point2).normalize().multiplyScalar(num).add(point1);
        point4=new THREE.Vector3().subVectors(point4,point3).normalize().multiplyScalar(num).add(point4);
    }else if(num<0&&(lxnum!=3)){
        point2=new THREE.Vector3().subVectors(point2,point1).normalize().multiplyScalar(-num).add(point2);
        point3=new THREE.Vector3().subVectors(point3,point4).normalize().multiplyScalar(-num).add(point3);
    }
    if(lxnum==2){//设置左右uv对齐
        var _p1=point1.clone();
        point1=point2.clone();
        point2=_p1;
        var _p3=point3.clone();
        point3=point4.clone();
        point4=_p3;
    }
    if(lxnum==3){
        if(num>0){
            point1=new THREE.Vector3().subVectors(point1,point2).normalize().multiplyScalar(num).add(point1);
            point2=new THREE.Vector3().subVectors(point2,point1).normalize().multiplyScalar(num).add(point2);
        }else if(num<0){
            point3=new THREE.Vector3().subVectors(point3,point4).normalize().multiplyScalar(-num).add(point3);
            point4=new THREE.Vector3().subVectors(point4,point3).normalize().multiplyScalar(-num).add(point4);
        }
    }
    return   {point1:point1,point2:point2,point3:point3,point4:point4};
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_Calculate_uv = function(tjlx,index,all,width,height) {//默认图片长宽相等
    var u=1,v=1;
    if(width!=undefined&&height!=undefined){
        this.JSQEX_Texturesize[index][0]=width;
        this.JSQEX_Texturesize[index][1]=height;
    }
    if(tjlx.beelinetype){
        if(index==0||all){

            if(this.layout.width1>=this.layout.width2){
                u=new THREE.Vector3().subVectors(this.JSQEX_vertices[2],this.JSQEX_vertices[3]).length();
            }else{
                u=new THREE.Vector3().subVectors(this.JSQEX_vertices[0],this.JSQEX_vertices[1]).length();
            }
            v=this.layout.length/this.steps.subsection+this.steps.depth;
            this.JSQEX_Texturescale[0]=[u/this.JSQEX_Texturesize[0][0],v/this.JSQEX_Texturesize[0][1]];
        }
        if(index==1||all){
            if(this.layout.width1>=this.layout.width2){
                u=new THREE.Vector3().subVectors(this.JSQEX_vertices[2],this.JSQEX_vertices[3]).length();
            }else{
                u=new THREE.Vector3().subVectors(this.JSQEX_vertices[0],this.JSQEX_vertices[1]).length();
            }
            v=this.steps.thickness;
            this.JSQEX_Texturescale[1]=[u/this.JSQEX_Texturesize[1][0],v/this.JSQEX_Texturesize[1][1]];
        }
        if(index==2||all){
            u=this.layout.length/this.steps.subsection+this.steps.depth;
            v=this.steps.thickness;
            this.JSQEX_Texturescale[2]=[u/this.JSQEX_Texturesize[2][0],v/this.JSQEX_Texturesize[2][1]];
        }
        if(index==3||all){
            if(!this.tjlx.open){
                u=Math.max(this.layout.width1,this.layout.width2);
            }else{
                u=this.support_beam.width;
            }
            v=this.layout.length;
            this.JSQEX_Texturescale[3]=[u/this.JSQEX_Texturesize[3][0],v/this.JSQEX_Texturesize[3][1]];
        }
        if(index==4||all){
             if(!this.tjlx.open){
                u=this.layout.width2;
            }else{
                u=this.support_beam.width;
            }
            v=this.support_beam.depth+this.step.height/this.steps.subsection>=this.step.height-this.steps.thickness?this.step.height-this.steps.thickness:(this.support_beam.depth+this.step.height/this.steps.subsection);
            if(this.tjlx.floor){
                v=this.step.height;
            }
            this.JSQEX_Texturescale[4]=[u/this.JSQEX_Texturesize[4][0],v/this.JSQEX_Texturesize[4][1]];
        }
        if(index==5||all){
            u=this.layout.length;
            v=this.step.height-this.steps.thickness;
            if(!this.tjlx.open){
                v=this.step.height;
            }
            this.JSQEX_Texturescale[5]=[u/this.JSQEX_Texturesize[5][0],v/this.JSQEX_Texturesize[5][1]];
        }
        if(index==6||all){
            v=this.layout.length;
            u=this.side_string.width+Math.abs(this.layout.width1-this.layout.width2)/2;
            this.JSQEX_Texturescale[6]=[u/this.JSQEX_Texturesize[6][0],v/this.JSQEX_Texturesize[6][1]];
        }
        if(index==7||all){
            u=this.side_string.width;
            v=this.side_string.depth;
            this.JSQEX_Texturescale[7]=[u/this.JSQEX_Texturesize[7][0],v/this.JSQEX_Texturesize[7][1]];
        }
        if(index==8||all){
            u=this.layout.length;
            v=this.side_string.depth-(this.step.height/this.steps.subsection)>this.side_string.offset?(this.step.height/this.steps.subsection)*(this.steps.subsection+1)+this.side_string.offset:(this.step.height/this.steps.subsection)*(this.steps.subsection+1)+this.side_string.offset-(this.side_string.offset+(this.step.height/this.steps.subsection)-this.side_string.depth)
            this.JSQEX_Texturescale[8]=[u/this.JSQEX_Texturesize[8][0],v/this.JSQEX_Texturesize[8][1]];
        }
    }else if(tjlx.utype||tjlx.ltype){
        var perheight=this.step.height/(this.layout.subsection1+this.layout.subsection2+1);
        if(index==0||all){//楼梯上下1
            u=this.layout.width;
            v=this.layout.length1/this.layout.subsection1+this.steps.depth;
            this.JSQEX_Texturescale[0]=[u/this.JSQEX_Texturesize[0][0],v/this.JSQEX_Texturesize[0][1]];
        }
        if(index==1||all){
            u=this.layout.width;
            v=this.steps.thickness;
            this.JSQEX_Texturescale[1]=[u/this.JSQEX_Texturesize[1][0],v/this.JSQEX_Texturesize[1][1]];
        }
        if(index==2||all){//楼梯左右1
            v=this.steps.thickness;
            u=this.layout.length1/this.layout.subsection1+this.steps.depth;
            this.JSQEX_Texturescale[2]=[u/this.JSQEX_Texturesize[2][0],v/this.JSQEX_Texturesize[2][1]];
        }
        if(index==3||all){//支撑梁下1
            u=this.support_beam.width;
            v=this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1);
            if(this.tjlx.close||this.tjlx.floor){
                v=this.layout.length1;
            }
            this.JSQEX_Texturescale[3]=[u/this.JSQEX_Texturesize[3][0],v/this.JSQEX_Texturesize[3][1]];
        }
        if(index==4||all){
            u=this.support_beam.width;
            v=this.support_beam.depth>perheight*(this.layout.subsection1+1)-this.steps.thickness?perheight*(this.layout.subsection1+1)-this.steps.thickness:perheight+this.support_beam.depth;
            if(this.tjlx.close){
                v=perheight+this.support_beam.depth
            }
            this.JSQEX_Texturescale[4]=[u/this.JSQEX_Texturesize[4][0],v/this.JSQEX_Texturesize[4][1]];
        }
        if(index==5||all){//支撑梁左右1
            if(this.tjlx.open){
                u=this.layout.length1/this.layout.subsection1*(this.layout.subsection1+1);
                v=perheight*(this.layout.subsection1+1)-this.steps.thickness;
            }else{
                u=this.layout.length1;
                v=perheight*this.layout.subsection1;
            }
            this.JSQEX_Texturescale[5]=[u/this.JSQEX_Texturesize[5][0],v/this.JSQEX_Texturesize[5][1]];
        }
        if(index==6||all){
            v=this.layout.length1;
            u=this.side_string.width;
            this.JSQEX_Texturescale[6]=[u/this.JSQEX_Texturesize[6][0],v/this.JSQEX_Texturesize[6][1]];
        }
        if(index==7||all){
            u=this.side_string.width;
            v=this.side_string.depth>perheight*(this.layout.subsection1+1)?perheight*(this.layout.subsection1+1):this.side_string.depth;
            this.JSQEX_Texturescale[7]=[u/this.JSQEX_Texturesize[7][0],v/this.JSQEX_Texturesize[7][1]];
        }
        if(index==8||all){
            u=this.layout.length1;
            v=this.side_string.depth-perheight>this.side_string.offset?perheight*(this.layout.subsection1+1)+this.side_string.offset:perheight*(this.layout.subsection1+1)+this.side_string.offset-(this.side_string.offset+perheight-this.side_string.depth)
            this.JSQEX_Texturescale[8]=[u/this.JSQEX_Texturesize[8][0],v/this.JSQEX_Texturesize[8][1]];
        }
        if(index==9||all){
            if(tjlx.utype){
                u=this.layout.width*2+this.layout.offset;
                v=this.paltform.width;
            }else{
                var pdarrr=[this.ptpoint1,this.ptpoint2,this.ptpoint3,this.ptpoint4,this.ptpoint5];
                var min_max1=this.JSQEX_computeBoundingBox(pdarrr);
                u=min_max1.max.x-min_max1.min.x;
                v=min_max1.max.z-min_max1.min.z;
            }
            this.JSQEX_Texturescale[9]=[u/this.JSQEX_Texturesize[9][0],v/this.JSQEX_Texturesize[9][1]];
        }
        if(index==10||all){
            if(tjlx.utype){
                u=this.layout.width*2+this.layout.offset;
            }else{
                u=new THREE.Vector3().subVectors(this.ptpoint1,this.ptpoint3).length();
            }
            if(this.tjlx.open){
                v=this.steps.thickness;
            }else if(this.tjlx.close){
                v=perheight;
            }else{
                v=perheight*(this.layout.subsection1+1)
            }
            this.JSQEX_Texturescale[10]=[u/this.JSQEX_Texturesize[10][0],v/this.JSQEX_Texturesize[10][1]];
        }
        if(index==11||all){
            u=this.paltform.width;
           if(this.tjlx.open){
                v=this.steps.thickness;
            }else if(this.tjlx.close){
                v=perheight;
            }else{
                v=perheight*(this.layout.subsection1+1)
            }
            this.JSQEX_Texturescale[11]=[u/this.JSQEX_Texturesize[11][0],v/this.JSQEX_Texturesize[11][1]];
        }
    }else if(tjlx.spiraltype){
        if(index==0||all){
            u=new THREE.Vector3().subVectors(this.uvp1,this.uvp2).length();
            v=new THREE.Vector3().subVectors(this.uvp1,this.uvp3).length();
            this.JSQEX_Texturescale[0]=[u/this.JSQEX_Texturesize[0][0],v/this.JSQEX_Texturesize[0][1]];
        }
        if(index==1||all){
            u=this.layout.width;
            v=this.steps.thickness;
            this.JSQEX_Texturescale[1]=[u/this.JSQEX_Texturesize[1][0],v/this.JSQEX_Texturesize[1][1]];
        }
        if(index==2||all){
            u=new THREE.Vector3().subVectors(this.uvp1,this.uvp3).length();
            v=this.steps.thickness;
            this.JSQEX_Texturescale[2]=[u/this.JSQEX_Texturesize[2][0],v/this.JSQEX_Texturesize[2][1]];
        }
        if(index==3||all){
            if(this.uvbottom_sup!=undefined){
                 u=this.uvbottom_sup.max.x-this.uvbottom_sup.min.x;
                 v=this.uvbottom_sup.max.z-this.uvbottom_sup.min.z;
            }
            this.JSQEX_Texturescale[3]=[u/this.JSQEX_Texturesize[3][0],v/this.JSQEX_Texturesize[3][1]];
        }
        if(index==4||all){
            u=this.support_beam.width;
            v=this.support_beam.depth+this.step.height/this.steps.subsection>=this.step.height-this.steps.thickness?this.step.height-this.steps.thickness:(this.support_beam.depth+this.step.height/this.steps.subsection);
            // v=this.support_beam.depth>this.step.height?this.step.height:(this.support_beam.depth+this.step.height/this.steps.subsection);
            if(this.tjlx.floor){
                v=this.step.height;
            }
            this.JSQEX_Texturescale[4]=[u/this.JSQEX_Texturesize[4][0],v/this.JSQEX_Texturesize[4][1]];
        }
        if(index==5||all){
            u=2*Math.PI*(this.layout.radius+this.support_beam.width/2)*this.layout.rotate/360;
            v=this.step.height-this.steps.thickness;
            if(!this.tjlx.open){
                v=this.step.height;
            }
            this.JSQEX_Texturescale[5]=[u/this.JSQEX_Texturesize[5][0],v/this.JSQEX_Texturesize[5][1]];
        }
        if(index==6||all){
            if(this.uvbottom_side!=undefined){
                 u=this.uvbottom_side.max.x-this.uvbottom_side.min.x;
                 v=this.uvbottom_side.max.z-this.uvbottom_side.min.z;
            }
            this.JSQEX_Texturescale[6]=[u/this.JSQEX_Texturesize[6][0],v/this.JSQEX_Texturesize[6][1]];
        }
        if(index==7||all){
            u=this.side_string.width;
            v=this.side_string.depth;
            this.JSQEX_Texturescale[7]=[u/this.JSQEX_Texturesize[7][0],v/this.JSQEX_Texturesize[7][1]];
        }
        if(index==8||all){
            u=2*Math.PI*(this.layout.radius+this.layout.width/2+this.side_string.width)*this.layout.rotate/360;
            v=this.step.height+this.step.height/this.steps.subsection+this.side_string.offset;
            this.JSQEX_Texturescale[8]=[u/this.JSQEX_Texturesize[8][0],v/this.JSQEX_Texturesize[8][1]];
        }
    } 
};

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_changedirection=function(num) {//1:顺时针，-1:逆时针
    var Currentobjectindex=this.JSQEX_checkindex(this.JSQEX_Currentobjectindex);
    if(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_pdnum==num&&!this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_object_type.ltype||this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_object_type.beelinetype||(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_object_type.ltype&&((this.JSQEX_stairsMesh_arr[Currentobjectindex].layout.angle<0&&num<0)||(this.JSQEX_stairsMesh_arr[Currentobjectindex].layout.angle>0&&num>0)))){
        return;
    }else{
        num==1?(this.JSQEX_stairsMesh_arr[Currentobjectindex].layout.angle=Math.abs(this.JSQEX_stairsMesh_arr[Currentobjectindex].layout.angle)):(this.JSQEX_stairsMesh_arr[Currentobjectindex].layout.angle=-Math.abs(this.JSQEX_stairsMesh_arr[Currentobjectindex].layout.angle))
    }
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_pdnum=num;
    if(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_object_type.spiraltype){
        this.JSQEX_initialdata.length=this.JSQEX_stairsMesh_arr[Currentobjectindex].layout.radius;
        this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_getpoints(this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_initialdata,true);
    }
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_drawstair();
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_isPowerOfTwo=function(num,obj,url){//处理尺寸不为2的整次幂的贴图
    function nearest_pow2( n ) {
        var l = Math.log( n ) / Math.LN2;
        return Math.pow( 2, Math.round(  l ) );
    }
    var _pdwidth=this.JSQEX_stairsMaterial.materials[num].map.image.width;
    var _pdheight=this.JSQEX_stairsMaterial.materials[num].map.image.height;
    this.JSQEX_stairsMaterial.materials[num].map.wrapS = this.JSQEX_stairsMaterial.materials[num].map.wrapT = THREE.RepeatWrapping;
    if (THREE.Math.isPowerOfTwo(_pdwidth) === false ||
        THREE.Math.isPowerOfTwo(_pdheight) === false) {
        var width = nearest_pow2(_pdwidth);
        var height = nearest_pow2(_pdheight);
        var canvas = document.createElement('canvas');// 注意每次需要新建  否者使用同一对象 会影响贴图显示
        var ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(this.JSQEX_stairsMaterial.materials[num].map.image,0,0,width,height);
        var _repeat=this.JSQEX_stairsMaterial.materials[num].map.repeat;
        this.JSQEX_stairsMaterial.materials[num].map = new THREE.Texture(canvas );
        this.JSQEX_stairsMaterial.materials[num].map.wrapS = this.JSQEX_stairsMaterial.materials[num].map.wrapT = THREE.RepeatWrapping;
        this.JSQEX_stairsMaterial.materials[num].map.repeat=_repeat;
        this.JSQEX_stairsMaterial.materials[num].map.needsUpdate = true;
    }
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_removeall = function(obj) {//楼梯删除
    if(obj!=undefined){
        this.JSQEX_removeobj(obj);
    }else{
        var num=this.JSQEX_stairsMesh_arr.length-1;
        if(num<0){
            console.log("无楼梯对象！");
            return;
        }
        this.JSQEX_stairsMesh_arr[num].JSQEX_dispose(); 
        this.JSQEX_stairsMesh_arr[num].JSQEX_stairsMesh.geometry.dispose();
        this.JSQEX_stairsMesh_arr[num].JSQEX_container.remove(this.JSQEX_stairsMesh_arr[num].JSQEX_stairsMesh);
        for(var i=0,j=this.JSQEX_stairsMesh_arr[num].JSQEX_stairsMesh.material.materials.length;i<j;i++){
            this.JSQEX_stairsMesh_arr[num].JSQEX_stairsMesh.material.materials[i].map.dispose();
            this.JSQEX_stairsMesh_arr[num].JSQEX_stairsMesh.material.materials[i].dispose();
        }
    　　for(var key in this.JSQEX_stairsMesh_arr[num]){
    　　　　if(this.JSQEX_stairsMesh_arr[num].hasOwnProperty(key)) {
                this.JSQEX_stairsMesh_arr[num][key]=null;
            }
    　　}
        delete this.JSQEX_stairsMesh_arr[num];
        this.JSQEX_stairsMesh_arr[num]=null;
        this.JSQEX_stairsMesh_arr.pop();
    }
    this.JSQEX_Select_obj_remove();
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_removeobj = function(obj) {
    var Currentobjectindex=this.JSQEX_checkindex(this.JSQEX_Currentobjectindex);
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_dispose(); 
    this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.geometry.dispose();
    for(var ii=0,j=this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.material.materials.length;ii<j;ii++){
        this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.material.materials[ii].map.dispose();
        this.JSQEX_stairsMesh_arr[Currentobjectindex].JSQEX_stairsMesh.material.materials[ii].dispose();
    }
    obj.JSQEX_container.remove(obj.JSQEX_stairsMesh);
    for(var key in this.JSQEX_stairsMesh_arr[Currentobjectindex]){
        if(this.JSQEX_stairsMesh_arr[Currentobjectindex].hasOwnProperty(key)) {
            this.JSQEX_stairsMesh_arr[Currentobjectindex][key]=null;
        }
　　}
    this.JSQEX_stairsMesh_arr[Currentobjectindex]=null;
    this.JSQEX_stairsMesh_arr.splice(Currentobjectindex,1);
    for(var key in this.JSQEX_initialdataarr[Currentobjectindex]){
        if(this.JSQEX_initialdataarr[Currentobjectindex].hasOwnProperty(key)) {
            this.JSQEX_initialdataarr[Currentobjectindex][key]=null;
        }
　　}
    this.JSQEX_initialdataarr[Currentobjectindex]=null;
    this.JSQEX_initialdataarr.splice(Currentobjectindex,1);
}


JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_Select_obj = function(){//选中物体
    var _obj=this.JSQEX_stairsMesh;
    var _parent=this.JSQEX_container;
    var _BoxHelper=_obj.JSQEX_entity.JSQEX_parent.JSQEX_BoxHelper!=null?_obj.JSQEX_entity.JSQEX_parent.JSQEX_BoxHelper:(_obj.JSQEX_entity.JSQEX_parent.JSQEX_BoxHelper=new THREE.BoxHelper(_obj));
    _parent.add(_BoxHelper);
    _BoxHelper.update( _obj );
    _obj.JSQEX_entity.JSQEX_parent.JSQEX_Currentobjectindex=_obj.JSQEX_entity.ID;
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_Select_obj_remove = function(parent,obj){//隐藏选中物体
   var _this=this;
   if(this.Stair_child!=undefined){
        _this=this.JSQEX_parent;
   }
    _this.JSQEX_BoxHelper&&_this.JSQEX_BoxHelper.parent&&_this.JSQEX_BoxHelper.parent.remove(_this.JSQEX_BoxHelper);
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_checkindex = function(id){//获取选中物体索引
    var _id=id!=undefined?id:this.JSQEX_Currentobjectindex; 
    for(var i=0,jj=this.JSQEX_stairsMesh_arr.length;i<jj;i++){
        if(this.JSQEX_stairsMesh_arr[i].ID==_id){
            return i;
        }
    }
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_screenshot = function (obj,width,height) {//计算包围盒，根据包围盒平移图形到原点，再根据包围盒更改相机参数适配图像
    var scope=this;
    var _obj=obj?obj:this.JSQEX_stairsMesh_arr[0];
    var _width=width?width:window.innerWidth;
    var _height=height?height:window.innerHeight;
    if(!this.renderer_ss){
        this.renderer_ss = new THREE.WebGLRenderer( {
            antialias: true,    // to get smoother output
            preserveDrawingBuffer: true,    // to allow screenshot
            alpha: true
        } );
        this.renderer_ss.setClearColor( new THREE.Color( 0x000000 ), 0 );
        this.renderer_ss.setSize(_width, _height);
        document.body.appendChild( this.renderer_ss.domElement );
        this.renderer_ss.domElement.id="JSQEX_Stair_screenshot";
        this.camera_ss = new THREE.OrthographicCamera( _width / - 30, _width / 30, _height / 30, _height / - 30, 1, 1000 );
        this.camera_ss.position.y=170;
        // this.camera_ss.lookAt(new THREE.Vector3(-1,0,0));
        this.camera_ss.up=new THREE.Vector3(-1,0,0);
        this.camera_ss.lookAt(new THREE.Vector3(0,0,0));
        this.scene_ss = new THREE.Scene();
    }
    if(this.ss_stairsMesh){
        this.ss_stairsMesh.geometry.dispose();
        this.scene_ss.remove(this.ss_stairsMesh);
        if(this.ss_stairsMesh.material.materials){
            for(var i=0,j=this.ss_stairsMesh.material.materials.length;i<j;i++){
                this.ss_stairsMesh.material.materials[i].map.dispose();
                this.ss_stairsMesh.material.materials[i].dispose();
            }
        }else{
            this.ss_stairsMesh.material.map&&this.ss_stairsMesh.material.map.dispose();
            this.ss_stairsMesh.material.dispose();
        }
        
    }
    this.ss_geom=_obj.JSQEX_stairsMesh.geometry.clone();
    var materials=[];
    for(var i=0,j=_obj.JSQEX_stairsMesh.material.materials.length;i<j;i++){
        materials.push(new THREE.MeshBasicMaterial());
        materials[i].map= _obj.JSQEX_stairsMesh.material.materials[i].map.clone();
    }
    this.ss_material = new THREE.MultiMaterial( materials );
    this.ss_geom.computeFaceNormals();
    this.ss_stairsMesh = new THREE.Mesh( this.ss_geom, this.ss_material );
    this.scene_ss.add(this.ss_stairsMesh);
    this.renderer_ss.render( this.scene_ss, this.camera_ss );//关键代码  
    var rangever=this.JSQEX_computeBoundingBox(this.ss_stairsMesh.geometry.vertices);
    console.log(rangever);
    var offsetx=(rangever.max.x-rangever.min.x)/2;
    var offsety=(rangever.max.y-rangever.min.y)/2;
    var offsetz=(rangever.max.z-rangever.min.z)/2;
    //平移到原点
    this.ss_stairsMesh.translateX(offsetx-rangever.max.x);
    this.ss_stairsMesh.translateY(offsety-rangever.max.y);
    this.ss_stairsMesh.translateZ(offsetz-rangever.max.z);
    // this.ss_stairsMesh.updateMatrixWorld();
    // this.ss_geom.applyMatrix(this.ss_stairsMesh.matrixWorld);
    //根据相机上方向计算投影矩阵
    if(this.camera_ss.up.equals(new THREE.Vector3(0,0,-1))||this.camera_ss.up.equals(new THREE.Vector3(0,0,-1))){
        if(offsetx/offsetz>_width/_height){//判断投影区域是以x轴还是z轴为基准
            this.camera_ss.left=-offsetx;
            this.camera_ss.right=offsetx;
            this.camera_ss.top=offsetx*_height/_width;
            this.camera_ss.bottom=-offsetx*_height/_width;
        }else{
            this.camera_ss.left=-offsetz*_width/_height;
            this.camera_ss.right=offsetz*_width/_height;
            this.camera_ss.top=offsetz;
            this.camera_ss.bottom=-offsetz;
        }
    }
    if(this.camera_ss.up.equals(new THREE.Vector3(-1,0,0))||this.camera_ss.up.equals(new THREE.Vector3(1,0,0))){
        if(offsetx/offsetz>_height/_width){//判断投影区域是以x轴还是z轴为基准
            this.camera_ss.left=-offsetx*_width/_height;
            this.camera_ss.right=offsetx*_width/_height;
            this.camera_ss.top=offsetx;
            this.camera_ss.bottom=-offsetx;
        }else{
            this.camera_ss.left=-offsetz;
            this.camera_ss.right=offsetz;
            this.camera_ss.top=offsetz*_height/_width;
            this.camera_ss.bottom=-offsetz*_height/_width;
        };
    }
    
    this.camera_ss.updateProjectionMatrix();
    // var rangever=this.JSQEX_computeBoundingBox(this.ss_stairsMesh.geometry.vertices);
    //重新计算包围盒
    var _rangevermax=new THREE.Vector3(offsetx,offsety,offsetz);
    var max=get_projector(_rangevermax);
    max.x=Math.min(max.x,_width);//限制在屏幕可见区域内
    max.y=Math.min(max.y,_height);
    max.x=Math.max(max.x,0);//限制在屏幕可见区域内
    max.y=Math.max(max.y,0);
    var _rangevermin=new THREE.Vector3(-offsetx,-offsety,-offsetz);
    var min=get_projector(_rangevermin);
    min.x=Math.min(min.x,_width);//限制在屏幕可见区域内
    min.y=Math.min(min.y,_height);
    min.x=Math.max(min.x,0);//限制在屏幕可见区域内
    min.y=Math.max(min.y,0);
    var image=new Image();
    image.width=_width;
    image.height=_height;
    // animatess();
    this.renderer_ss.render( this.scene_ss, this.camera_ss );//关键代码  绘制下一帧
    image.src=this.renderer_ss.domElement.toDataURL();
    image.onload = function () {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var w=Math.abs(max.x-min.x);
        var h=Math.abs(max.y-min.y);
        var min_x=Math.min(max.x,min.x);
        var max_x=Math.max(max.x,min.x);
        var min_y=Math.min(max.y,min.y)
        var max_y=Math.max(max.y,min.y)
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(image,min_x,min_y,w,h,0,0,w,h);
        // ctx.drawImage(image,0,0,window.innerWidth,window.innerHeight);
        var newwin=window.open()
        myimg=newwin.document.createElement("img")
        myimg.src=canvas.toDataURL()
        newwin.document.body.appendChild(myimg)
    }
    function get_projector(world_vector){
        if (world_vector) {
            var HalfBrowseWidth = _width/ 2;
            var HalfBrowseHeight = _height / 2;
            var checkCam = scope.camera_ss;
            var vector = world_vector.project(checkCam);
            var result = {
                x: Math.round(vector.x * HalfBrowseWidth + HalfBrowseWidth),
                y: Math.round(-vector.y * HalfBrowseHeight + HalfBrowseHeight)
            };
            console.log(result);
            return result;
        }
        else {
            return { x: 0, y: 0 };
        }
    }
    // animatess()
    // function animatess() {
    //     requestAnimationFrame( animatess );
    //     scope.renderer_ss.render( scope.scene_ss, scope.camera_ss );
    // } 
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_checkarr = function(_arr){//处理栏杆xz平面相连的点的重叠数据
   for(var i=0,jj=_arr.length;i<jj;i++){
        if(_arr[i+1]&&JSQEXMathematics.JSQEX_abs_nearlyEquals(_arr[i].x,_arr[i+1].x)&&JSQEXMathematics.JSQEX_abs_nearlyEquals(_arr[i].z,_arr[i+1].z)){
            _arr.splice(i+1,1);
            i--;
            jj--;
        }
    }
    return _arr;
}

JSQEXBasicStructure.JSQEX_Stair.prototype.JSQEX_getjdpoints = function(){
   return this.JSQEX_jdpoints;
}


