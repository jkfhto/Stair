/**
 * Created by JSQ on 2016/5/28.
 */
function JSQEX_highLightObj( mesh, mInd, bool, color ) {
    var mf = Engine.mainInterface;
    if ( mf.JSQEX_sliceLineMesh ) {
        mf.noDepthScene.remove(mf.JSQEX_sliceLineMesh);
        mf.JSQEX_sliceLineMesh.geometry.dispose();
        mf.JSQEX_sliceLineMesh.material.dispose();
        mf.JSQEX_sliceLineMesh = null;
    }
    if ( bool ) {
        var geo = mesh.geometry;
        var lines = [];
        var counts = [];
        var normals = [];

        function JSQEX_checkExist(p1, p2, norInd) {
            if ( lines[ norInd ] ) {
                for (var i = 0; i < lines[norInd].length; i++) {
                    if (( p1.x == lines[norInd][i][0].x && p1.y == lines[norInd][i][0].y && p1.z == lines[norInd][i][0].z && p2.x == lines[norInd][i][1].x && p2.y == lines[norInd][i][1].y && p2.z == lines[norInd][i][1].z ) ||
                        ( p1.x == lines[norInd][i][1].x && p1.y == lines[norInd][i][1].y && p1.z == lines[norInd][i][1].z && p2.x == lines[norInd][i][0].x && p2.y == lines[norInd][i][0].y && p2.z == lines[norInd][i][0].z )) {
                        counts[ norInd ][i]++;
                        return true;
                    }
                }
            }
        }

        function JSQEX_checkNormal( face ) {
            for ( var i = 0; i < normals.length; i++ ) {
                if ( JSQEXMathematics.JSQEX_nearlyEquals( normals[i].x, face.normal.x ) && JSQEXMathematics.JSQEX_nearlyEquals( normals[i].y, face.normal.y ) && JSQEXMathematics.JSQEX_nearlyEquals( normals[i].z, face.normal.z ) ) return i;
            }
            return -1;
        }

        for (var f = 0; f < geo.faces.length; f++) {
            var face = geo.faces[f];
            var p = [];
            p[0] = geo.vertices[ face.a ];
            p[1] = geo.vertices[ face.b ];
            p[2] = geo.vertices[ face.c ];
            var norInd = JSQEX_checkNormal( face );
            if ( norInd > -1 ) {
                for (var j = 0; j < p.length; j++) {
                    var next = JSQEX_getNext(p, j);
                    if (!JSQEX_checkExist(p[j], p[next], norInd)) {
                        lines[ norInd ].push([p[j], p[next]]);
                        counts[ norInd ].push(0)
                    }
                }
            }
            else {
                lines.push([]);
                counts.push([]);
                normals.push( face.normal );
                for (j = 0; j < p.length; j++) {
                    next = JSQEX_getNext(p, j);
                    if (!JSQEX_checkExist(p[j], p[next], norInd)) {
                        lines[ lines.length - 1 ].push([p[j], p[next]]);
                        counts[ lines.length - 1 ].push(0);
                    }
                }
            }
        }

        var g = new THREE.Geometry();
        mesh.updateMatrixWorld( true );
        for (f = 0; f < lines.length; f++) {
            for ( j = 0; j < lines[f].length; j++ ) {
                if (!counts[f][j]) {
                    for (var k = 0; k < lines[f][j].length; k++) {
                        var pg1 = new THREE.Vector3().copy(lines[f][j][k]);
                        pg1 = mesh.localToWorld(pg1);
                        g.vertices.push(pg1);
                    }
                }
            }
        }

        color = color ? color : new THREE.Color(0, 0, 0);
        mf.JSQEX_sliceLineMesh = new THREE.Line(g, new THREE.LineBasicMaterial({ color: color }), THREE.LinePieces);

        mf.noDepthScene.add(mf.JSQEX_sliceLineMesh);
    }
}


function JSQEX_highLightSurf( mesh, mInd, bool, color ) {
    var mf = Engine.mainInterface;
    if ( mf.JSQEX_sliceLineMesh ) {
        mf.noDepthScene.remove(mf.JSQEX_sliceLineMesh);
        mf.JSQEX_sliceLineMesh.geometry.dispose();
        mf.JSQEX_sliceLineMesh.material.dispose();
        mf.JSQEX_sliceLineMesh = null;
    }
    if ( bool ) {
        var geo = mesh.geometry;

        var lines = [];
        var counts = [];

        function JSQEX_checkExist(p1, p2) {
            for (var i = 0; i < lines.length; i++) {
                if (( p1.x == lines[i][0].x && p1.y == lines[i][0].y && p1.z == lines[i][0].z && p2.x == lines[i][1].x && p2.y == lines[i][1].y && p2.z == lines[i][1].z ) ||
                    ( p1.x == lines[i][1].x && p1.y == lines[i][1].y && p1.z == lines[i][1].z && p2.x == lines[i][0].x && p2.y == lines[i][0].y && p2.z == lines[i][0].z )) {
                    counts[i]++;
                    return true;
                }
            }
        }

        for (var f = 0; f < geo.faces.length; f++) {
            var face = geo.faces[f];
            if (face.materialIndex == mInd) {
                var p = [];
                p[0] = geo.vertices[ face.a ];
                p[1] = geo.vertices[ face.b ];
                p[2] = geo.vertices[ face.c ];
                for (var j = 0; j < p.length; j++) {
                    var next = JSQEX_getNext(p, j);
                    if (!JSQEX_checkExist(p[j], p[next])) {
                        lines.push([p[j], p[next]]);
                        counts.push(0)
                    }
                }
            }
        }
        var g = new THREE.Geometry();
        mesh.updateMatrixWorld( true );
        for (f = 0; f < lines.length; f++) {
            if (!counts[f]) {
                for (j = 0; j < lines[f].length; j++) {
                    var pg1 = new THREE.Vector3().copy(lines[f][j]);
                    pg1 = mesh.localToWorld(pg1);
                    g.vertices.push(pg1);
                }
            }
        }
        color = color ? color : new THREE.Color(0, 0, 0);
        mf.JSQEX_sliceLineMesh = new THREE.Line(g, new THREE.LineBasicMaterial({ color: color }), THREE.LinePieces);

        mf.noDepthScene.add(mf.JSQEX_sliceLineMesh);
    }
}

THREE.Mesh.prototype.JSQEX_dispose = function() {
    var mf = Engine.mainInterface;
    var gSet = mf.task.grapic2D;
    this.JSQEX_removed = true;
    if ( this.isAttPlane || this.JSQEX_isCorePlane ) {
        var g = gSet[this.graphID];
        g.deleteAttPlane( this, true );
    }
    else if ( this.furnSet && this.profile ) {
        mf.deleteFurn( this.profile.index, true );
    }
    else if ( this.isParquet ) {
        g = gSet[this.graphID];
        g.deleteParquet( this, true );
    }
    else if ( this.isHole ) {
        if ( this.JSQEX_holeMesh ) {
            delete this.JSQEX_holeMesh.JSQEX_furn;
            if ( this.JSQEX_holeMesh.parent ) this.JSQEX_holeMesh.parent.remove( this.JSQEX_holeMesh );
            this.JSQEX_holeMesh.geometry.dispose();
            mf.mirrorGroup[this.JSQEX_holeMesh.mIndexGroup[0]] && mf.mirrorGroup[this.JSQEX_holeMesh.mIndexGroup[0]].deleteMirror();
        }
        this.geometry.dispose();
        this.material.dispose();
    }
    else {
        if ( this.parent ) this.parent.remove( this );
        if ( this.geometry.share ) this.geometry.share--;
        if ( !this.geometry.share || this.geometry.share == 1 ) this.geometry.dispose();

        if ( this.material.share ) this.material.share--;
        if ( !this.material.share || this.material.share == 1 ) {
            if ( this.material instanceof THREE.MeshFaceMaterial ) {
                for ( var i = 0; i < this.material.materials.length; i++ ) {
                    this.material.materials[i].dispose();
                    this.material.materials[i].disposeTextures();
                    //if ( this.material.materials[i].map ) this.material.materials[i].map.dispose();
                    //if ( this.material.materials[i].normalMap ) this.material.materials[i].normalMap.dispose();
                }
            }
            else {
                this.material.dispose();
                this.material.disposeTextures();
            }
        }
    }
};

THREE.Mesh.prototype.JSQEX_onEntityDirty = function() {
    JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_NeedUpdate, {
        mainObj: this
    });
};

THREE.Mesh.prototype.JSQEX_draw = function() {
    if ( this.furnSet == "door" || this.furnSet == "window" ) {
        var graph = Engine.mainInterface.task.grapic2D[ this.myParent ];
        Engine.interfaceController.clearFurnHole( this, true );

        if ( graph ) {
            graph.addFurnHole( this );
        }
    }

};

THREE.Mesh.prototype.JSQEX_dump = function(a, structureOnly) {
    var mf = Engine.mainInterface;
    var gSet = mf.task.grapic2D;
    if ( this.furnSet !== "door" && this.furnSet !== "window" && structureOnly ) return [];
    if ( this.furnSet ) {
        var furn = {};
        furn.JSQEX_removed = this.JSQEX_removed;
        furn.isFurn = true;
        furn.id = this.id;
        furn.profileID = this.profile.id;
        furn.url = this.profile.url;
        furn.texturePath = this.profile.texturePath;
        furn.binPath = this.profile.binPath;
        furn.position = new THREE.Vector3().copy( this.position );
        furn.json = this.profile.json;
        furn.groupId = this.groupId;
        furn.scale = new THREE.Vector3().copy( this.scale );
        furn.box = this.box.concat();
        furn.index = this.profile.index;
        var ebParam = this.ebParam;


        if (ebParam) {

            if ( ebParam.wall ) this.ebParam.edgeInd = ebParam.wall.index;
            else {
                var g = gSet[this.profile.graphID];
                for ( var j = 0; j < g.pointList.length; j++ ) {
                    if ( g.adjustObj( this, j, undefined, true ) ) break;
                }

            }

            if ( ebParam.wall ) {

                furn.ebParam = {};
                furn.ebParam.type = ebParam.type;
                furn.ebParam.edgeInd = ebParam.wall.index;
                furn.ebParam.cowallID = ebParam.wall.JSQEX_cowall.ID;
            }
        }
        var rot = this.rotation;
        furn.rotation = new THREE.Vector3(rot.x, rot.y, rot.z);
        furn.profileY = this.profile.position.y;

        furn.graphID = this.profile.graphID;
        if ( this.JSQEX_holePattern instanceof Array ) {
            furn.JSQEX_holePattern = copyObj( this.JSQEX_holePattern );
        }
        return [furn];
    }
    else if ( this.isHole ) {
        var hole = {};
        if ( this.JSQEX_holePattern instanceof Array ) {
            hole.JSQEX_holePattern = copyObj( this.JSQEX_holePattern );
        }
        hole.JSQEX_removed = this.JSQEX_removed;
        hole.JSQEX_data = { vertices: this.JSQEX_path, nodes: this.JSQEX_nodes, isClose: true };
        hole.position = new THREE.Vector3().copy( this.position );
        hole.isHole = true;
        hole.id = this.id;
        hole.attachID = this.attachID;
        hole.myParent = this.myParent;
        return [hole];
    }
    else if ( this.isAttPlane ) {
        var planeEle = {};
        planeEle.isAttPlane = true;
        planeEle.id = this.id;
        planeEle.JSQEX_removed = this.JSQEX_removed;
        planeEle.size = JSQEX_getAttPlaneSize(this);
        this.material.template.JSQEX_clearLoadedImages();
        planeEle.pattern = this.material.template.pattern;
        planeEle.border = this.material.template.borderGroup;
        planeEle.position = new THREE.Vector3().copy( this.position );
        var rotation = this.rotation;
        planeEle.rotation = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
        planeEle.graphID = this.graphID;
        planeEle.wallID = this.wallID;
        planeEle.wallType = this.wallType;
        planeEle.cowallID = gSet[this.graphID].innerWallGroup[this.wallID].JSQEX_cowall.ID;
        return [planeEle]
    }
    else if ( this.JSQEX_isCorePlane ) {
        planeEle = {};
        planeEle.JSQEX_isCorePlane = true;
        planeEle.id = this.id;
        planeEle.JSQEX_removed = this.JSQEX_removed;
        planeEle.size = JSQEX_getAttPlaneSize(this);
        this.material.template.JSQEX_clearLoadedImages();
        planeEle.pattern = this.material.template.pattern;
        planeEle.border = this.material.template.borderGroup;
        planeEle.position = new THREE.Vector3().copy( this.position );
        rotation = this.rotation;
        planeEle.rotation = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
        planeEle.graphID = this.graphID;
        return [planeEle]
    }
    else if ( this.isParquet ) {
        var parEle = {};
        parEle.isParquet = true;
        parEle.id = this.id;
        parEle.JSQEX_removed = this.JSQEX_removed;
        parEle.size = JSQEX_getAttPlaneSize(this);
        parEle.pattern = this.material.template.pattern[0];
        parEle.position = new THREE.Vector3().copy( this.position );
        rotation = this.rotation;
        parEle.rotation = new THREE.Vector3(rotation.x, rotation.y, rotation.z);
        parEle.graphID = this.graphID;
        if (this.borderPlane) {
            var borEle = {};
            borEle.id = this.borderPlane.id;
            borEle.size = JSQEX_getAttPlaneSize(this.borderPlane);
            borEle.border = this.borderPlane.material.template.borderGroup[0];
            borEle.position = this.borderPlane.position;

            parEle.borEle = borEle;
        }
        return [parEle];
    }
};

function JSQEX_getTemplate( pattern, size, mesh ) {
    var uParam = Engine.mainInterface.pEditor.genUnitGroup(pattern);

    return new JSQ.TextureTemplate(uParam.uGroup, size, uParam.uCycle, null, mesh, pattern, undefined, size.bps, Engine);
}

function JSQEX_deleteSingleLabel( lines ) {
    var mf = Engine.mainInterface;
    lines.remove( lines.labelPlane );
    mf.Scene2D.remove( lines );
    var h5text = lines.h5Text;
    lines.geometry.dispose();
    lines.labelPlane.geometry.dispose();
    lines.labelPlane.material.map.dispose();
    lines.labelPlane.material.dispose();
    delete lines.labelPlane;
    //lines.material.dispose();
    mf.cssScene.remove(h5text);
    delete lines.h5Text;
}

function JSQEX_createSingleLabel( from, to, isTextArea, selected, tickLength1, tickLength2, showSmall ) {
    var mf = Engine.mainInterface;
    var ps = new THREE.Vector2( from.x, from.z );
    var pe = new THREE.Vector2( to.x, to.z );
    var len = THREE.Vector2.JSQEX_difference( ps, pe ).length() * 100;
    if ( len <= 201 && !showSmall ) return;
    var vector = new THREE.Vector3();
    var offset = new THREE.Vector3();
    vector.subVectors( to, from );
    offset.copy( vector );
    vector.normalize().multiplyScalar( 3.0 );
    offset.normalize().multiplyScalar( 0.8 );

    var p11 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, from, tickLength1 ? -tickLength1 : -0.8 );
    var pp11 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, from, -0.8 );
    var p111 = new THREE.Vector3();
    p111.addVectors( pp11, offset );
    var p21 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, to, tickLength1 ? -tickLength1 : -0.8 );
    var pp21 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, to, -0.8 );
    var p211 = new THREE.Vector3();
    p211.addVectors( pp21, offset );
    var p12 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, from, tickLength2 ? tickLength2 : 0.8 );
    var pp12 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, from, 0.8 );
    var p121 = new THREE.Vector3();
    p121.subVectors( pp12, offset );
    var pp22 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, to, 0.8 );
    var p22 = JSQEXMathematics.JSQEX_projectOnWall( ps, pe, to, tickLength2 ? tickLength2 : 0.8 );
    var p221 = new THREE.Vector3();
    p221.subVectors( pp22, offset );
    var p13 = from;
    var p23 = to;
    var p14 = new THREE.Vector3();
    var p24 = new THREE.Vector3();
    var pos = new THREE.Vector3();
    pos.addVectors( p13, p23 );
    pos.divideScalar( 2.0 );
    p14.addVectors( p13, p23 );
    p14.divideScalar( 2.0 );
    p24.copy( p14 );
    p24.addVectors( p24, vector );
    p14.subVectors( p14, vector );
    var geo = new THREE.Geometry();
    geo.vertices.push( p11, p12, p21, p22, p13, p14, p23, p24, p111, p121, p211, p221 );

    var lineMesh = new THREE.Line( geo, mf.lineMat, THREE.LinePieces );


    len = len.toFixed( 0 );
    var labelTex = genTextTex( len,
        { fontsize: 100, borderColor: {r:255, g:255, b:255, a:1.0}, backgroundColor: {r:255, g:255, b:255, a:1.0} } );
    var labelPlane = new THREE.Mesh( new THREE.PlaneGeometry( 6, 3 ), new THREE.MeshBasicMaterial( { map: labelTex } ) );
    labelPlane.visible = false;
    lineMesh.add( labelPlane );
    labelPlane.position = pos;
    lineMesh.position.y += 0.2;
    labelPlane.rotation.x = -Math.PI / 2;
    labelPlane.rotation.z = Math.PI / 2;
    lineMesh.labelPlane = labelPlane;
    if ( isTextArea ) labelPlane.h5ID = "label" + isTextArea;

    var absPos = new THREE.Vector3();
    absPos.copy( pos );

    absPos.y = 0;

    lineMesh.h5Text = mf.addHtmlLabel( len, absPos, undefined, undefined, isTextArea, selected );
    return lineMesh;
}

var JSQEXBasicStructure = {};
JSQEXBasicStructure.JSQEX_NextID = 1;
JSQEXBasicStructure.JSQEX_LoadNextID = 0;
JSQEXBasicStructure.JSQEX_waitWallUpdateQueue = {};
JSQEXBasicStructure.JSQEX_waitRoomUpdateQueue = {};
JSQEXBasicStructure.JSQEX_waitContentUpdateQueue = {};
JSQEXBasicStructure.JSQEX_waitPlankUpdateQueue = {};


JSQEXBasicStructure.JSQEX_loadHoleFromData = function( holes ) {
    for ( var i = 0; i < holes.length; i++ ) {
        var cowall = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[holes[i].attachID];
        var hole = Engine.mainInterface.JSQEX_createHoleMesh( holes[i].JSQEX_data );
        hole.JSQEX_holePattern = holes[i].JSQEX_holePattern;
        cowall && cowall.JSQEX_addHole( hole );
    }
};

JSQEXBasicStructure.JSQEX_disposeExpertLabel = function() {
    var mf = Engine.mainInterface;
    if ( mf.JSQEX_expertLabels instanceof Array ) {
        for ( var i = 0; i < mf.JSQEX_expertLabels.length; i++ ) {
            JSQEX_deleteSingleLabel(mf.JSQEX_expertLabels[i]);
        }
    }

    mf.JSQEX_expertLabels = [];
};

JSQEXBasicStructure.JSQEX_genExpertLabel = function() {
    var mf = Engine.mainInterface;
    var labelMode = mf.labelMode;
    var maxLayerNum = 1;
    var distanceToGraph = customGlobalVar.JSQEX_distanceToGraph;
    var labelInterval = 8;
    JSQEXBasicStructure.JSQEX_disposeExpertLabel();
    //if ( !mf.JSQEX_expertLabels ) mf.JSQEX_expertLabels = [];
    if ( !customGlobalVar.labelVisible ) return;
    var planP = mf.JSQEX_getGraphField(labelMode == "middle");
    var center = new THREE.Vector2( ( planP[0].x + planP[1].x ) / 2, ( planP[0].y + planP[1].y ) / 2 );
    var size = new THREE.Vector2( Math.abs( ( planP[0].x - planP[1].x ) / 2 ), Math.abs( ( planP[0].y - planP[1].y ) / 2 ) );
    var horizons = [];
    var verticals = [];
    var hWidth = [];
    var vWidth = [];
    var horizonsOut = [];
    var verticalsOut = [];

    function dealWall(p1, p2, normal, isInner, isWidth) {
        if ( p1 && p2 ) {
            var sub = new THREE.Vector2().subVectors(p1, p2);
            var len = sub.length();
            if ( !isWidth && len < 2 ) return;
            if (Math.abs(sub.x) < 1e-6 && Math.abs(sub.y) > 1e-3) {

                var ele = {
                    JSQEX_start: p1.y > p2.y ? p2 : p1,
                    JSQEX_end: p1.y > p2.y ? p1 : p2,
                    JSQEX_length: len,
                    JSQEX_normal: normal
                };
                if ( !isWidth ) {
                    for (var i = 0; i < horizons.length; i++) {
                        if (JSQEXMathematics.JSQEX_nearlyEquals(horizons[i].JSQEX_start.y, ele.JSQEX_start.y) &&
                            JSQEXMathematics.JSQEX_nearlyEquals(horizons[i].JSQEX_end.y, ele.JSQEX_end.y)) break;
                    }
                    if (i == horizons.length) {
                        for (i = 0; i < horizonsOut.length; i++) {
                            if (JSQEXMathematics.JSQEX_nearlyEquals(horizonsOut[i].JSQEX_start.y, ele.JSQEX_start.y) &&
                                JSQEXMathematics.JSQEX_nearlyEquals(horizonsOut[i].JSQEX_end.y, ele.JSQEX_end.y)) break;
                        }
                        if (i == horizonsOut.length) {
                            isInner ? horizons.push(ele) : horizonsOut.push(ele);
                        }
                    }
                }
                else {
                    for ( i = 0; i < hWidth.length; i++) {
                        if (JSQEXMathematics.JSQEX_nearlyEquals(hWidth[i].JSQEX_start.y, ele.JSQEX_start.y) &&
                            JSQEXMathematics.JSQEX_nearlyEquals(hWidth[i].JSQEX_end.y, ele.JSQEX_end.y)) break;
                    }
                    if (i == hWidth.length) hWidth.push( ele );
                }
            }
            else if (Math.abs(sub.y) < 1e-6 && Math.abs(sub.x) > 1e-3) {
                ele = {
                    JSQEX_start: p1.x > p2.x ? p2 : p1,
                    JSQEX_end: p1.x > p2.x ? p1 : p2,
                    JSQEX_length: len,
                    JSQEX_normal: normal
                };
                if ( !isWidth ) {
                    for (i = 0; i < verticals.length; i++) {
                        if (JSQEXMathematics.JSQEX_nearlyEquals(verticals[i].JSQEX_start.x, ele.JSQEX_start.x) &&
                            JSQEXMathematics.JSQEX_nearlyEquals(verticals[i].JSQEX_end.x, ele.JSQEX_end.x)) break;
                    }
                    if (i == verticals.length) {
                        for (i = 0; i < verticalsOut.length; i++) {
                            if (JSQEXMathematics.JSQEX_nearlyEquals(verticalsOut[i].JSQEX_start.x, ele.JSQEX_start.x) &&
                                JSQEXMathematics.JSQEX_nearlyEquals(verticalsOut[i].JSQEX_end.x, ele.JSQEX_end.x)) break;
                        }
                        if (i == verticalsOut.length)
                            isInner ? verticals.push(ele) : verticalsOut.push(ele);
                    }
                }
                else {
                    for ( i = 0; i < vWidth.length; i++) {
                        if (JSQEXMathematics.JSQEX_nearlyEquals(vWidth[i].JSQEX_start.x, ele.JSQEX_start.x) &&
                            JSQEXMathematics.JSQEX_nearlyEquals(vWidth[i].JSQEX_end.x, ele.JSQEX_end.x)) break;
                    }
                    if (i == vWidth.length) vWidth.push( ele );
                }
            }
        }
    }

    function getWallLabel(wall) {
        if ( wall.JSQEX_partner ) {

            if ( checkWall( wall ) && checkWall( wall.JSQEX_partner ) )
                return;
        }
        var p1, p2, p3, p4;
        var isInner = !!wall.JSQEX_partner;
        var points = wall.JSQEX_getLabelPoints();
        var normal = points.JSQEX_direction;
        if ( labelMode == "middle" ) {
            p1 = new THREE.Vector2( wall.JSQEX_From.x, wall.JSQEX_From.y );
            p2 = new THREE.Vector2( wall.JSQEX_To.x, wall.JSQEX_To.y );
        }
        else {

            if ( points && points.length ) {
                p1 = new THREE.Vector2(points[0].x, points[0].z);
                p2 = new THREE.Vector2(points[1].x, points[1].z);

                if ( points[2] && points[3] ) {
                    p3 = new THREE.Vector2(points[2].x, points[2].z);
                    p4 = new THREE.Vector2(points[3].x, points[3].z);
                }
            }
        }
        var onlyWidth = !wall.JSQEX_getParentRoom()
        if ( !onlyWidth ) dealWall( p1, p2, normal, isInner );
        dealWall( p3, p4, normal, isInner, true );
    }

    function checkWall( cwall ) {
        var from = cwall.JSQEX_From;
        var to = cwall.JSQEX_To;
        var pre = cwall.JSQEX_prev.JSQEX_From;
        var third = cwall.JSQEX_next.JSQEX_To;
        return !singleVertexStatus2D( from, pre, to ) || !singleVertexStatus2D( to, from, third );
    }

    mf.JSQEX_structureInfos.JSQEX_forEachWall( function( wall ) {

        getWallLabel(wall);

    } );

    //mf.JSQEX_structureInfos.JSQEX_forEachRoom( function( room ) {
    //    room.JSQEX_forEachWall( function(wall) {
    //        delete wall.JSQEX_dealed;
    //    } )
    //} );

    verticals.sort(function(a, b) {
        return a.JSQEX_length - b.JSQEX_length
    });

    verticalsOut.sort(function(a, b) {
        return a.JSQEX_length - b.JSQEX_length
    });

    horizons.sort(function(a, b) {
        return a.JSQEX_length - b.JSQEX_length
    });

    horizonsOut.sort(function(a, b) {
        return a.JSQEX_length - b.JSQEX_length
    });

    verticals = verticalsOut.concat( verticals );
    horizons = horizonsOut.concat( horizons );
    function JSQEX_rearrangeLabels( labels, dir, width ) {
        //labels.sort(function(a, b) {
        //    return a.JSQEX_length - b.JSQEX_length
        //});

        if ( !labels.length ) {
            return [ [], [] ];
        }
        var positive = [];
        var minus = [];

        function JSQEX_resetLabelPos(label, coord, value) {
            var sp = label.JSQEX_start;
            var ep = label.JSQEX_end;
            if ( coord == 'x' ) {
                sp.x = value;
                ep.x = value;
            }
            else {
                sp.y = value;
                ep.y = value;
            }
        }
        function JSQEX_sowSeed(arrow) {


            var curPick = -1;
            if ( dir == 'h' ) {
                for ( var d = 0; d < labels.length; d++ ) {
                    var angle1 = labels[d].JSQEX_normal.angleTo( new THREE.Vector3( 1, 0, 0 ) );
                    var angle2 = labels[d].JSQEX_normal.angleTo( new THREE.Vector3( -1, 0, 0 ) );
                    if ( ( ( angle1 < Math.PI / 4 ) && ( arrow == 'p' ) ) ||
                        ( ( angle2 < Math.PI / 4 ) && ( arrow == 'm' ) )) {

                        curPick = d;
                        break;
                    }
                }

                var label = labels[curPick];
                if ( label ) {
                    labels.splice(curPick, 1);
                    if (arrow == 'p') {
                        var dis = positive.length * labelInterval + distanceToGraph;
                        JSQEX_resetLabelPos(label, 'x', center.x + dis + size.x);
                        var arr = [label];
                        arr.arrow = "+h";
                        arr.JSQEX_dis = Math.abs(label.JSQEX_start.x - center.x);
                        positive.push(arr);
                        return positive[positive.length - 1];
                    }
                    else if (arrow == 'm') {
                        dis = minus.length * labelInterval + distanceToGraph;
                        JSQEX_resetLabelPos(label, 'x', center.x - dis - size.x);
                        arr = [label];
                        arr.arrow = "-h";
                        arr.JSQEX_dis = Math.abs(label.JSQEX_start.x - center.x);
                        minus.push(arr);
                        return minus[minus.length - 1];
                    }
                }
            }
            else {

                for ( d = 0; d < labels.length; d++ ) {
                    angle1 = labels[d].JSQEX_normal.angleTo( new THREE.Vector3( 0, 0, 1 ) );
                    angle2 = labels[d].JSQEX_normal.angleTo( new THREE.Vector3( 0, 0, -1 ) );
                    if ( ( ( angle1 < Math.PI / 4 ) && ( arrow == 'p' ) ) ||
                        ( ( angle2 < Math.PI / 4 ) && ( arrow == 'm' ) )) {
                        curPick = d;
                        break;
                    }
                }
                label = labels[curPick];
                if ( label ) {
                    labels.splice(curPick, 1);
                    if (arrow == 'p') {
                        dis = positive.length * labelInterval + distanceToGraph;
                        JSQEX_resetLabelPos(label, 'y', center.y + dis + size.y);
                        arr = [label];
                        arr.arrow = "+v";
                        arr.JSQEX_dis = Math.abs(label.JSQEX_start.y - center.y);
                        positive.push(arr);
                        return positive[positive.length - 1];
                    }
                    else if (arrow == 'm') {
                        dis = minus.length * labelInterval + distanceToGraph;
                        JSQEX_resetLabelPos(label, 'y', center.y - dis - size.y);
                        arr = [label];
                        arr.arrow = "-v";
                        arr.JSQEX_dis = Math.abs(label.JSQEX_start.y - center.y);
                        minus.push(arr);
                        return minus[minus.length - 1];
                    }
                }
            }

        }

        function JSQEX_traceDir( seed, arrow, dir, resource, darrow ) {
            var tail = ( arrow == 'p' ? seed[seed.length - 1].JSQEX_end : seed[0].JSQEX_start );
            var srcs = resource ? resource : labels;
            for ( var t = 0; t < srcs.length; t++ ) {
                if ( !resource ) {
                    var angle1, angle2;
                    if (dir == 'h') {
                        angle1 = srcs[t].JSQEX_normal.angleTo(new THREE.Vector3(1, 0, 0));
                        angle2 = srcs[t].JSQEX_normal.angleTo(new THREE.Vector3(-1, 0, 0));

                        if (darrow == '+h' && angle1 > Math.PI / 4) continue;
                        else if (darrow == '-h' && angle2 > Math.PI / 4) continue;

                    }
                    else {
                        angle1 = srcs[t].JSQEX_normal.angleTo(new THREE.Vector3(0, 0, 1));
                        angle2 = srcs[t].JSQEX_normal.angleTo(new THREE.Vector3(0, 0, -1));

                        if (darrow == '+v' && angle1 > Math.PI / 4) continue;
                        else if (darrow == '-v' && angle2 > Math.PI / 4) continue;
                    }
                }
                if ( arrow == 'p' &&
                    JSQEXMathematics.JSQEX_nearlyEquals( dir == 'h' ? srcs[t].JSQEX_start.y : srcs[t].JSQEX_start.x, dir == 'h' ? tail.y : tail.x )) {
                    var dis = ( dir == 'h' ) ? seed[0].JSQEX_start.x : seed[0].JSQEX_start.y;
                    var lab = copyObj( srcs[t] );
                    JSQEX_resetLabelPos( lab, ( dir == 'h' ) ? 'x' : 'y', dis );
                    seed.push(lab);
                    if ( !resource ) srcs.splice( t, 1 );
                    return true;
                }
                else if ( arrow == 'm' &&
                    JSQEXMathematics.JSQEX_nearlyEquals( dir == 'h' ? srcs[t].JSQEX_end.y : srcs[t].JSQEX_end.x, dir == 'h' ? tail.y : tail.x ) ) {
                    dis = ( dir == 'h' ) ? seed[0].JSQEX_start.x : seed[0].JSQEX_start.y;
                    lab = copyObj( srcs[t] );
                    JSQEX_resetLabelPos( lab, ( dir == 'h' ) ? 'x' : 'y', dis );
                    seed.splice(0, 0, lab);
                    if ( !resource ) srcs.splice( t, 1 );
                    return true;
                }
            }

            return false;
        }

        function JSQEX_findClosestSeed( arr ) {
            var minL = 9e9;
            var minInd = 0;
            for ( var i = 0; i < arr.length; i++ ) {
                if ( arr[i].JSQEX_dis < minL ) {
                    minL = arr[i].JSQEX_dis;
                    minInd = i;
                }
            }
            return minInd;
        }

        function JSQEX_resetArrPos( arr, coord, pm ) {
            for ( var i = 0; i < arr.length; i++ ) {
                var dis = i * labelInterval + distanceToGraph;
                var value = 0;
                if ( coord == 'x' ) {
                    if ( pm == 'p' ) value = center.x + dis + size.x;
                    else if ( pm == 'm' ) value = center.x - dis - size.x;
                }
                else {
                    if ( pm == 'p' ) value = center.y + dis + size.y;
                    else if ( pm == 'm' ) value = center.y - dis - size.y;
                }

                for ( var j = 0; j < arr[i].length; j++ ) {
                    JSQEX_resetLabelPos(arr[i][j], coord, value);
                }
            }
        }

        function JSQEX_addLostLabels( seed, dir ) {
            if ( dir == 'h' ) {
                var end = center.y + size.y;
                var start = center.y - size.y;
                if ( seed[seed.length - 1].JSQEX_end.y - end < -1 ) {
                    var p1 = new THREE.Vector2().copy( seed[seed.length - 1].JSQEX_end );
                    var p2 = new THREE.Vector2( seed[seed.length - 1].JSQEX_end.x, end );
                    var sub = new THREE.Vector2().subVectors( p1, p2 );
                    var ele = { JSQEX_start: p1, JSQEX_end: p2, JSQEX_length: sub.length() };
                    seed.push( ele );
                }

                if ( seed[0].JSQEX_start.y - start > 1) {
                    p2 = new THREE.Vector2().copy( seed[0].JSQEX_start );
                    p1 = new THREE.Vector2( seed[0].JSQEX_end.x, start );
                    sub = new THREE.Vector2().subVectors( p1, p2 );
                    ele = { JSQEX_start: p1, JSQEX_end: p2, JSQEX_length: sub.length() };
                    seed.push( ele );
                }
            }
            else {
                end = center.x + size.x;
                start = center.x - size.x;
                if ( seed[seed.length - 1].JSQEX_end.x - end < -1 ) {
                    p1 = new THREE.Vector2().copy( seed[seed.length - 1].JSQEX_end );
                    p2 = new THREE.Vector2( end, seed[seed.length - 1].JSQEX_end.y );
                    sub = new THREE.Vector2().subVectors( p1, p2 );
                    ele = { JSQEX_start: p1, JSQEX_end: p2, JSQEX_length: sub.length() };
                    seed.push( ele );
                }

                if ( seed[0].JSQEX_start.x - start > 1 ) {
                    p2 = new THREE.Vector2().copy( seed[0].JSQEX_start );
                    p1 = new THREE.Vector2( start, seed[0].JSQEX_end.y );
                    sub = new THREE.Vector2().subVectors( p1, p2 );
                    ele = { JSQEX_start: p1, JSQEX_end: p2, JSQEX_length: sub.length() };
                    seed.push( ele );
                }
            }
        }

        function seedTracing(seed) {
            if ( seed ) {
                if (labelMode !== "middle") JSQEX_traceDir(seed, 'p', dir, width, seed.arrow);
                while (JSQEX_traceDir(seed, 'p', dir, undefined, seed.arrow)) {
                    if (labelMode !== "middle") JSQEX_traceDir(seed, 'p', dir, width, seed.arrow)
                }
                if (labelMode !== "middle") JSQEX_traceDir(seed, 'm', dir, width, seed.arrow);
                while (JSQEX_traceDir(seed, 'm', dir, undefined, seed.arrow)) {
                    if (labelMode !== "middle") JSQEX_traceDir(seed, 'm', dir, width, seed.arrow)
                }
                JSQEX_addLostLabels(seed, dir);
            }
        }

        //while( labels.length ) {
        var seed = JSQEX_sowSeed('p');
        seedTracing(seed)



        seed = JSQEX_sowSeed('m');

        seedTracing(seed)
        //}

        if ( positive.length - minus.length > 1 ) {
            var ind = JSQEX_findClosestSeed( positive );
            var arr = positive[ind];
            positive.splice( ind, 1 );
            minus.splice( 0, 0, arr );
        }
        else if ( !minus.length ) {
            ind = JSQEX_findClosestSeed( positive );
            arr = positive[ind];
            minus.push( copyObj( arr ) );
        }
        else if ( minus.length - positive.length > 1 ) {
            ind = JSQEX_findClosestSeed( minus );
            arr = minus[ind];
            minus.splice( ind, 1 );
            positive.splice( 0, 0, arr );
        }
        else if ( !positive.length ) {
            ind = JSQEX_findClosestSeed( minus );
            arr = minus[ind];
            positive.push( copyObj( arr ) );
        }

        JSQEX_resetArrPos( positive, dir == 'h' ? 'x' : 'y', 'p' );
        JSQEX_resetArrPos( minus, dir == 'h' ? 'x' : 'y', 'm' );

        return [ positive, minus ];
    }

    function JSQEX_drawLabels(res, dir) {
        //var geo = new THREE.SphereGeometry(1, 5, 5);
        //var mat = new THREE.MeshBasicMaterial();
        for ( var r = 0; r < res.length; r++ ) {
            for( var s = 0; s < Math.min( maxLayerNum, res[r].length ); s++ ) {
                for ( var t = 0; t < res[r][s].length; t++ ) {
                    var label = res[r][s][t];
                    var sp = new THREE.Vector3(label.JSQEX_start.x, 0.07, label.JSQEX_start.y);
                    var ep = new THREE.Vector3(label.JSQEX_end.x, 0.07, label.JSQEX_end.y);
                    var lab = ( ( dir == 'h' && r == 1 ) || ( dir == 'v' && r == 0 ) ) ?
                        JSQEX_createSingleLabel(sp, ep, undefined, undefined, labelInterval) :
                        JSQEX_createSingleLabel(sp, ep, undefined, undefined, 0, labelInterval);
                    if (lab) mf.JSQEX_expertLabels.push( lab );
                    mf.Scene2D.add(lab);
                    //var mesh1 = new THREE.Mesh(geo, mat);
                    //mesh1.position.copy(sp);
                    //var mesh2 = new THREE.Mesh(geo, mat);
                    //mesh2.position.copy(ep);
                    //mf.Scene2D.add(mesh1);
                    //mf.Scene2D.add(mesh2);
                }
            }
        }
    }
    var res1 = JSQEX_rearrangeLabels( verticals, 'v', vWidth );
    var res2 = JSQEX_rearrangeLabels( horizons, 'h', hWidth );

    JSQEX_drawLabels(res1, 'v');
    JSQEX_drawLabels(res2, 'h');
    return [ res1, res2 ];
};

JSQEXBasicStructure.JSQEX_loadOneParquetFromData = function( parquetData ) {
    var mf = Engine.mainInterface;
    var gSet = mf.task.grapic2D;


    var graph = gSet[ parquetData.graphID ];
    var par = graph.addParquet( parquetData.position, parquetData.size, parquetData.pattern, undefined, true, parquetData.borEle ? true : false, parquetData.id, parquetData.rotation );
    //par.rotation.x = parquetData.rotation.x;
    //par.rotation.y = parquetData.rotation.y;
    //par.rotation.z = parquetData.rotation.z;

    if ( parquetData.borEle ) {
        var bm = parquetData.borEle.border.length > 1 ? graph.createBorderPlane( par, parquetData.borEle.border[ 0 ], parquetData.borEle.size ) :
            graph.createBorderPlane( par, parquetData.borEle.border[ 0 ], parquetData.borEle.size, true );
        for ( var j = 1; j < parquetData.borEle.border.length; j++ ) {
            if ( j == parquetData.borEle.border.length - 1 )
                graph.updateAttPlaneMat( bm, null, parquetData.borEle.border[ j ], j, true, true, true );
            else graph.updateAttPlaneMat( bm, null, parquetData.borEle.border[ j ], j, true, false, true );

        }
        bm.material.template.loadTex();

    }

};

JSQEXBasicStructure.JSQEX_loadParquetFromData = function( parquets ) {
    for ( var i = 0; i < parquets.length; i++ ) {
        var parquetData = parquets[i];
        JSQEXBasicStructure.JSQEX_loadOneParquetFromData(parquetData);
    }
};

JSQEXBasicStructure.JSQEX_loadCorePlaneFromData = function( corePlanes ) {
    for ( var i = 0; i < corePlanes.length; i++ ) {
        var planeData = corePlanes[i];
        JSQEXBasicStructure.JSQEX_loadOneCorePlaneFromData(planeData);
    }
};

JSQEXBasicStructure.JSQEX_restoreAttPlaneFromData = function( attPlanes ) {
    var scene = Engine.mainInterface.perScene;
    for ( var i = 0; i < attPlanes.length; i++ ) {
        var planeData = attPlanes[i];

        var plane = scene.getObjectById( planeData.id, true );
        if ( plane ) {
            plane.size = new THREE.Vector2().copy( planeData.size );
            plane.pattern = copyObj( planeData.pattern );
            plane.border = copyObj( planeData.border );
            plane.position = new THREE.Vector3().copy( planeData.position );
            var rotation = planeData.rotation;
            plane.rotation.x = rotation.x;
            plane.rotation.y = rotation.y;
            plane.rotation.z = rotation.z;


            var oldRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[plane.graphID];
            if ( oldRoom instanceof JSQEXBasicStructure.JSQEX_Room ) delete oldRoom.JSQEX_contents[plane.id];
            var newRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[planeData.graphID];
            if ( newRoom instanceof JSQEXBasicStructure.JSQEX_Room ) newRoom.JSQEX_contents[plane.id] = plane;

            var oldWall = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[plane.cowallID];
            if ( oldRoom instanceof JSQEXBasicStructure.JSQEX_CWall ) delete oldWall.JSQEX_edge.JSQEX_embedFurns[plane.id];
            var newWall = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[planeData.cowallID];
            if ( newRoom instanceof JSQEXBasicStructure.JSQEX_CWall ) newWall.JSQEX_edge.JSQEX_embedFurns[plane.id] = plane;

            plane.graphID = planeData.graphID;
            plane.wallID = planeData.wallID;
            plane.wallType = planeData.wallType;
            plane.cowallID = planeData.cowallID;
        }
        else {
            JSQEXBasicStructure.JSQEX_loadOneAttPlaneFromData(planeData);
        }
    }
};

JSQEXBasicStructure.JSQEX_restoreCorePlaneFromData = function( corePlanes ) {
    var scene = Engine.mainInterface.perScene;
    for ( var i = 0; i < corePlanes.length; i++ ) {
        var planeData = corePlanes[i];

        var plane = scene.getObjectById( planeData.id, true );
        if ( plane ) {
            plane.size = new THREE.Vector2().copy( planeData.size );
            plane.pattern = copyObj( planeData.pattern );
            plane.border = copyObj( planeData.border );
            plane.position = new THREE.Vector3().copy( planeData.position );
            var rotation = planeData.rotation;
            plane.rotation.x = rotation.x;
            plane.rotation.y = rotation.y;
            plane.rotation.z = rotation.z;


            var oldRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[plane.graphID];
            if ( oldRoom instanceof JSQEXBasicStructure.JSQEX_Room ) delete oldRoom.JSQEX_contents[plane.id];
            var newRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[planeData.graphID];
            if ( newRoom instanceof JSQEXBasicStructure.JSQEX_Room ) newRoom.JSQEX_contents[plane.id] = plane;
            plane.graphID = planeData.graphID;

        }
        else {
            JSQEXBasicStructure.JSQEX_loadOneAttPlaneFromData(planeData);
        }
    }
};

JSQEXBasicStructure.JSQEX_restoreParquetFromData = function( parquets ) {
    var scene = Engine.mainInterface.perScene;
    for ( var i = 0; i < parquets.length; i++ ) {

        var parquetData = parquets[i];
        var plane = scene.getObjectById( parquetData.id, true );
        if ( plane ) {
            plane.size = new THREE.Vector2().copy(parquetData.size);
            plane.pattern = copyObj(parquetData.pattern);
            plane.position = new THREE.Vector3().copy(parquetData.position);
            if (plane.profile) {
                plane.profile.position.x = parquetData.position.x;
                plane.profile.position.z = parquetData.position.z;
            }
            var rotation = parquetData.rotation;
            plane.rotation.x = rotation.x;
            plane.rotation.y = rotation.y;
            plane.rotation.z = rotation.z;
            var oldRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[plane.graphID];
            if (oldRoom instanceof JSQEXBasicStructure.JSQEX_Room) delete oldRoom.JSQEX_contents[plane.id];
            var newRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[parquetData.graphID];
            if (newRoom instanceof JSQEXBasicStructure.JSQEX_Room) newRoom.JSQEX_contents[plane.id] = plane;
            plane.graphID = parquetData.graphID;
        }
        else {
            JSQEXBasicStructure.JSQEX_loadOneParquetFromData( parquetData );
        }
    }
};

JSQEXBasicStructure.JSQEX_restoreFurnFromData = function( furns ) {
    var mf = Engine.mainInterface;
    var scene = mf.perScene;
    var newFurnList = [];
    var newProfileList = [];
    for ( var i = 0; i < furns.length; i++ ) {
        var furnData = furns[i];
        var furn = scene.getObjectById( furnData.id, true );
        if ( furn ) {
            newFurnList[ furnData.index ] = furn;
            newProfileList[ furnData.index ] = furn.profile;
            furn.scale = new THREE.Vector3().copy(furnData.scale);
            furn.box = furnData.box.concat();
            var ebParam = furn.ebParam;
            if (ebParam) {
                if (ebParam.wall) delete ebParam.wall.JSQEX_cowall.JSQEX_edge.JSQEX_embedFurns[furn.id];
            }

            var rot = furnData.rotation;
            furn.rotation = new THREE.Vector3(rot.x, rot.y, rot.z);
            furn.profile.position.x = furnData.position.x;
            furn.profile.position.z = furnData.position.z;
            furn.profile.position.y = furnData.profileY;
            furn.position.copy(furnData.position);
            var oldRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[furn.graphID];
            if (oldRoom instanceof JSQEXBasicStructure.JSQEX_Room) delete oldRoom.JSQEX_contents[furn.id];
            var newRoom = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[furnData.graphID];
            if (newRoom instanceof JSQEXBasicStructure.JSQEX_Room) newRoom.JSQEX_contents[furn.id] = furn;
            furn.profile.graphID = furnData.graphID;
            furn.myParent = furnData.graphID;
            furn.JSQEX_onEntityDirty();
        }
        else {
            mf.addFurn( furnData, furnData.index, newFurnList, newProfileList );
        }
    }

    function JSQEX_checkExist(furnId) {
        for ( var j = 0; j < furns.length; j++ ) {
            if ( furns[j].id == furnId ) return true;
        }

        return false;
    }

    for ( i = mf.addedFurn.length - 1; i > -1; i-- ) {
        if ( !JSQEX_checkExist( mf.addedFurn[i].id ) ) {
            mf.addedFurn[i].JSQEX_dispose();
        }
    }

    mf.addedFurn = newFurnList;
    mf.addedProfiles = newProfileList;
};

JSQEXBasicStructure.JSQEX_loadOneCorePlaneFromData = function( planeData ) {
    var mf = Engine.mainInterface;
    var gSet = mf.task.grapic2D;

    var border = planeData.border[ 0 ];
    var graph = gSet[ planeData.graphID ];

    var plane = graph.JSQEX_addCorePlane( planeData.position, planeData.size, planeData.pattern[ 0 ], border[ 0 ], planeData.index, true, border.length > 1, planeData.id, planeData.rotation, border.length > 1 );
    for ( var k = 1; k < border.length; k++ ) graph.updateAttPlaneMat( plane, null, border[ k ], undefined, ( border.length - 1 ) !== k, ( border.length - 1 ) == k, true);
};

JSQEXBasicStructure.JSQEX_loadOneAttPlaneFromData = function( planeData ) {
    var mf = Engine.mainInterface;
    var gSet = mf.task.grapic2D;
    var cowall = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[planeData.cowallID];

    var border = planeData.border[ 0 ];
    var graph = gSet[ planeData.graphID ];
    var wallID = cowall.JSQEX_WallMesh3D.JSQEX_WallPlanes[ planeData.wallType].index;

    var mindis = 9e9;
    var curID = wallID;
    for ( var j = 0; j < graph.pointList.length; j++ ) {
        var ind = j % graph.pointList.length;
        var next = JSQEX_getNext( graph.pointList, ind );
        var p1 = new THREE.Vector2( graph.pointList[ind].x, graph.pointList[ind].z );
        var p2 = new THREE.Vector2( graph.pointList[next].x, graph.pointList[next].z );

        var p0 = new THREE.Vector2( planeData.position.x, planeData.position.z );

        var dis = JSQEXMathematics.JSQEX_closestDistanceToSegment( p0, p1, p2 );

        if ( mindis > dis ) {
            curID = ind;
            mindis = dis;
        }
    }
    wallID = curID;
    var plane = graph.addAttachPlane( wallID, planeData.position, planeData.size, planeData.pattern[ 0 ], border[ 0 ], planeData.id, true );
    for ( var k = 1; k < border.length; k++ ) graph.updateAttPlaneMat( plane, null, border[ k ], undefined, undefined, undefined, true);
};

JSQEXBasicStructure.JSQEX_loadAttPlaneFromData = function( attPlanes ) {

    for ( var i = 0; i < attPlanes.length; i++ ) {
        var planeData = attPlanes[i];
        JSQEXBasicStructure.JSQEX_loadOneAttPlaneFromData( planeData );
    }
};

JSQEXBasicStructure.JSQEX_Common_Parameters = {
    JSQEX_Tolerance: 0.05,
    JSQEX_Infinity: 9e9,

    JSQEX_SiteSize: 3,
    JSQEX_SiteColor: 0x817e7e,
    JSQEX_SiteOpacity: 0.4,
    JSQEX_SiteTexture: THREE.ImageUtils.loadTexture("textures/interface/site.png"),

    JSQEX_EdgeColor: 0x888888,
    JSQEX_BearEdgeColor: 0x000000,
    JSQEX_BorderColor: 0x000000,
    JSQEX_EditableEdgeColor: 0xffffff,
    JSQEX_WallDefaultWidth: 2,
    JSQEX_WallDefaultHeight: 29,
    JSQEX_PartialWallHeight: 16,
    JSQEX_MaxWallPointsNum: 10,
    JSQEX_MaxBorderPointsNum: 4,
    //JSQEX_WallUpdateTexture: THREE.ImageUtils.loadTexture("textures/walls/tile/chessBoard.jpg"),

    JSQEX_RoomMinimumSize: 2,

    JSQEX_DEFAULT_MOLDING_PARAM: {
        JSQEX_ID: "molding_none",
        JSQEX_HEIGHT: .1,
        JSQEX_MIN_HEIGHT: 0,
        JSQEX_MAX_HEIGHT: 4,
        JSQEX_THICKNESS: .015
    },

    JSQEX_MOLDING_DEFAULT_SHININESS: 60,
    JSQEX_MOLDING_CORNICE_DEFAULT_SHININESS: 40,

    JSQEX_MOLDING_DEFAULT_COLOR: 14737632,
    JSQEX_MOLDING_DEFAULT_SPECULAR: 16777215
};


JSQEXBasicStructure.BasicStructure = function( id ) {
    this.ID = id;
    this.JSQEX_generateID();
    this.JSQEX_parents = {};
    this.JSQEX_children = {};
    this.JSQEX_canEdit = true;
    this.JSQEX_canSelect = true;
    this.JSQEX_hided = false;
    this.JSQEX_database[ this.ID ] = this;
    //this._JSQEX_boundDirty = true;
    this.JSQEX_removed = false;
    //Engine.mainInterface.JSQEX_AllEntities[ this.ID ] = this;
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database = {};

JSQEXBasicStructure.BasicStructure.JSQEX_Load = function( a, b ) {
    if (a) {
        var c = a.id;
        var d = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[c];
        if (d)
            return d;
        d = new (eval(a.JSQEX_Class))(c);
        d.JSQEX_load(a, b);
        var idNum = Number( c );
        !Number.isNaN(idNum) && JSQEXBasicStructure.JSQEX_LoadNextID < idNum && (JSQEXBasicStructure.JSQEX_LoadNextID = idNum);
        return d;
    }
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_generateID = function() {
    if (this.ID) {
        var a = Number(this.ID) + 1;
        if ( a > JSQEXBasicStructure.JSQEX_NextID ) JSQEXBasicStructure.JSQEX_NextID = a;
    } else
        this.ID = String( JSQEXBasicStructure.JSQEX_NextID++ );
};
JSQEXBasicStructure.BasicStructure.prototype.JSQEX_Class = "JSQEXBasicStructure.BasicStructure";
JSQEXBasicStructure.BasicStructure.prototype._JSQEX_loadEntity = function(a, b) {
    return JSQEXBasicStructure.BasicStructure.JSQEX_Load(a, b)
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_defineField = function(a, b) {
    Object.defineProperty(this, a, {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this["__" + a]
        },
        set: function(b) {
            var d = this["__" + a];
            this["__" + a] = b;
            if (this._JSQEX_fieldChangedCallback[a])
                this._JSQEX_fieldChangedCallback[a](this, a, d, b)
        }
    });
    this._JSQEX_fieldChangedCallback = this._JSQEX_fieldChangedCallback || {};
    this._JSQEX_fieldChangedCallback[a] = b || this.JSQEX_defaultFieldChangedCallback
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_hasChild = function(a) {
    return void 0 !== this.JSQEX_children[a.ID]
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_addChild = function(a, needDispatchEvent) {
    if ( this.JSQEX_removed ) {
        console.log( "object has been removed" );
        return a;
        //this.JSQEX_removed = false;

    }

    if ( a.JSQEX_removed ) {
        a.JSQEX_removed = false;
        a.JSQEX_onEntityDirty();
    }
    if (!this.JSQEX_children[a.ID]) {
        this.JSQEX_children[a.ID] = a;
        a.JSQEX_parents[this.ID] = this;
        if ( needDispatchEvent ) {
            JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildAdded, {
                mainObj: a
            } );
            a.JSQEX_dispatchInvalidateSubgraph( true );
        }
        return a;
    }
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_removeAllChildren = function(a) {
    a = !1 !== a;
    for (var b in this.JSQEX_children)
        this.JSQEX_removeChild(this.JSQEX_children[b].ID, a);
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_removeChild = function(a, b) {
    return this._JSQEX_removeChild(a, b, !0);
};

JSQEXBasicStructure.BasicStructure.prototype._JSQEX_removeChild = function(a, b, c) {
    var d = !1 !== b;
    c = !1 !== c;
    var e = this.JSQEX_children[a];
    if (e) {
        var f = Object.keys(e.JSQEX_parents);
        1 === f.length && f[0] === this.ID && (c && e.JSQEX_removeAllChildren(b),
            d && JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildRemoved, {
            mainObj: e
        }));
        delete e.JSQEX_parents[this.ID];
        delete this.JSQEX_children[a];


        return e
    }
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_dump = function() {
    //if ( this.JSQEX_removed ) return [];
    return [{
        JSQEX_Class: this.JSQEX_Class,
        id: this.ID,
        JSQEX_parents: Object.keys(this.JSQEX_parents),
        JSQEX_children: Object.keys(this.JSQEX_children),
        JSQEX_canEdit : this.JSQEX_canEdit,
        JSQEX_canSelect : this.JSQEX_canSelect,
        JSQEX_hided : this.JSQEX_hided
    }]
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_save = function() {
    return this.JSQEX_dump()[0];
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_load = function(a, b) {

    a.JSQEX_children.forEach(function(a) {
        if ( b.JSQEX_data[a] ) {
            a = this._JSQEX_loadEntity(b.JSQEX_data[a], b);
            this.JSQEX_addChild(a)
        }
    }, this);

    this.JSQEX_onEntityDirty();
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_restore = function(a) {

        function b(a, b, c, d) {

            for (var e = 0, f = b.length; e < f; ++e) {
                var g = b[e];
                -1 === a.indexOf(g) && c(g)
            }
            e = 0;
            for (f = a.length; e < f; ++e)
                g = a[e],
                    -1 === b.indexOf(g) && d(g)
        }
        function c(a, c, g) {
            -1 === e.indexOf(a) && ("JSQEX_parents" === a ? (
                b(Object.keys(c), g, function(a) {
                    a = d.JSQEX_database[a];
                    a.JSQEX_addChild(d, !1);
                    f[a.ID + " + " + d.ID] = !0
                }, function(a) {
                    a = d.JSQEX_database[a];
                    a.JSQEX_removeChild(d.ID);
                    f[a.ID + " - " + d.ID] = !0
                })) : "JSQEX_children" === a ? (
                b(Object.keys(c), g, function(a) {
                    a = d.JSQEX_database[a];
                    d.JSQEX_addChild(a, !1);
                    f[d.ID + " + " + a.ID] = !0
                }, function(a) {
                    a = d.JSQEX_database[a];
                    d.JSQEX_removeChild(a.ID);
                    f[d.ID + " - " + a.ID] = !0
                })) : (c = d.JSQEX_database[g],
                    void 0 === d[a] && c ? d[a] = c : d[a] instanceof JSQEXBasicStructure.BasicStructure ? d[a].ID !== g && (d[a] = d.JSQEX_database[g]) : d[a] !== g && (d[a] = g)))
        }
        var d = this
            , e = ["ID", "id", "JSQEX_Class"]
            , f = {};

        for (var g in a) {
            var h = a[g]
                , m = this[g];
            (JSQEXUtilities.JSQEX_isArray(h) || h !== m) && c(g, m, h)
        }
        return f

};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_draw = function() {
    this._JSQEX_boundDirty = false;
    //console.log("no draw function");
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_dispose = function() {
    //console.log("no draw function");
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_dispatchInvalidateSubgraph = function( isAdded ) {
    var b = isAdded ? JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildAdded : JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildRemoved;
    var c;
    for (c in this.JSQEX_children) {
        var d = this.JSQEX_children[c];
        JSQEXUtilities.JSQEX_dispatchEvent( b, {
            mainObj: d
        } );
        d.JSQEX_dispatchInvalidateSubgraph( isAdded );
    }
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_replaceChild = function(a, b) {
    //if ( b && ( a == b.ID ) ) return;
    var c = this.JSQEX_removeChild(a, !0);
    b && this.JSQEX_addChild(b, !0);
    return c
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_replaceParent = function(a, b, c) {
    if (a !== b) {
        if (a) {
            a._JSQEX_removeChild(this.ID, c, !b);
            if ( b ) b.JSQEX_addChild(this, c);
        }
        return b
    }
};

JSQEXBasicStructure.BasicStructure.prototype.JSQEX_onEntityDirty = function() {
    if ( !this.JSQEX_removed ) {
        JSQEXUtilities.JSQEX_dispatchEvent(JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_NeedUpdate, {
            mainObj: this
        });
        this._JSQEX_boundDirty = true;
    }
};

JSQEXBasicStructure.BasicStructure.prototype._JSQEX_invalidateSubgraph = function() {
    this.JSQEX_onEntityDirty();
    for (var a in this.JSQEX_parents)
        this.JSQEX_parents[a]._JSQEX_invalidateSubgraph()
};

JSQEXBasicStructure.BasicStructure.JSQEX_defaultFieldChangedCallback = function(obj, fieldName, oldValue, newValue) {
    obj.JSQEX_onFieldChanged(fieldName, oldValue, newValue);
}
;
JSQEXBasicStructure.BasicStructure.prototype.JSQEX_onFieldChanged = function(fieldName, oldValue, newValue) {
    //console.log( "Default is used" );
};


JSQEXBasicStructure.BasicStructure.prototype.JSQEX_getUniqueParent = function() {
    var a = Object.keys(this.JSQEX_parents);
    return 1 !== a.length ? void 0 : this.JSQEX_parents[a[0]]
};

JSQEXBasicStructure.JSQEX_Site = function( id ) {
    JSQEXBasicStructure.BasicStructure.call( this, id );
    this.x = 0;
    this.y = 0;
    //this = pos ? new THREE.Vector2( pos.x, pos.y ) : new THREE.Vector2();
};

JSQEXUtilities.JSQEX_inherits( JSQEXBasicStructure.JSQEX_Site, JSQEXBasicStructure.BasicStructure );

Object.defineProperties(JSQEXBasicStructure.JSQEX_Site.prototype, {
    x: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,

        get: function() {

            return this._x;
        },
        set: function( a ) {
            var b = this._x;
            this._x = a;
            this.JSQEX_onFieldChanged("x", b, a);
        }
    },
    y: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._y;
        },
        set: function( a ) {
            var b = this._y;
            this._y = a;
            this.JSQEX_onFieldChanged("y", b, a);
        }
    }
});

JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Site";

JSQEXBasicStructure.JSQEX_Site.JSQEX_create = function( pos ) {
    var site = new JSQEXBasicStructure.JSQEX_Site();
    site.x = pos.x;
    site.y = pos.y;
    return site;
};

JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_euqals = function(a) {
    var b = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_Tolerance;
    return Math.abs(this.x - a.x) < b && Math.abs(this.y - a.y) < b
};

JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_onFieldChanged = function(a, b, c) {
    if ( this.JSQEX_removed ) {
        console.log( "object has been removed" );
        return;
    }
    this._JSQEX_invalidateSubgraph();
    JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_FieldChanged, {
        mainObj: this,
        JSQEX_fieldName: a,
        JSQEX_oldValue: b,
        JSQEX_newValue: c
    });
    if ( this.JSQEX_mesh ) {
        if (a == 'x') this.JSQEX_mesh.position.x = c;
        if (a == 'y') this.JSQEX_mesh.position.z = c;
    }
};
JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_onEntityDirty = function() {
    JSQEXBasicStructure.JSQEX_Site.superClass_.JSQEX_onEntityDirty.call(this);
    this._JSQEX_boundDirty = !0
};

JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_dispose = function() {
    if ( this.JSQEX_mesh ) {
        this.JSQEX_mesh.geometry.dispose();
        this.JSQEX_mesh.material.dispose();
        Engine.mainInterface.Scene2D.remove(this.JSQEX_mesh);
        this.JSQEX_mesh = null;
    }
    this.JSQEX_removed = true;
};

JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_dump = function() {
    //if ( this.JSQEX_removed ) return [];
    var a = JSQEXBasicStructure.JSQEX_Site.superClass_.JSQEX_dump.call(this)
        , b = a[0];
    b.x = this.x;
    b.y = this.y;
    return a
};

JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_Site.superClass_.JSQEX_load.call(this, a, b);
    this.x = a.x;
    this.y = a.y
};

JSQEXBasicStructure.JSQEX_Site.prototype.JSQEX_draw = function() {
    if ( !this.JSQEX_mesh ) {
        var param = JSQEXBasicStructure.JSQEX_Common_Parameters;
        var siteMat = new THREE.MeshBasicMaterial({ "map": param.JSQEX_SiteTexture, color: param.JSQEX_SiteColor, transparent: true, alphaTest: 0.1, opacity: param.JSQEX_SiteOpacity });
        this.JSQEX_mesh = new THREE.Mesh(new THREE.PlaneGeometry(param.JSQEX_SiteSize, param.JSQEX_SiteSize, 1, 1), siteMat);
        this.JSQEX_mesh.rotation.x = -Math.PI / 2;
    }
    this.JSQEX_mesh.position = new THREE.Vector3( this.x, 0.2, this.y );
    this.JSQEX_mesh.JSQEX_entity = this;
    this.JSQEX_mesh.isSite = true;
    Engine.mainInterface.Scene2D.add(this.JSQEX_mesh);
    this._JSQEX_boundDirty = false;
};

JSQEXBasicStructure.JSQEX_Site_getPointOwner = function(a) {
    var b = {
        JSQEX_walls: [],
        JSQEX_rooms: []
    };
    if (!a.JSQEX_parents)
        return b;
    for (var c in a.JSQEX_parents) {
        var d = a.JSQEX_parents[c];
        if (!b.JSQEX_walls.includes(d)) {
            b.JSQEX_walls.push(d);
            for (var e in d.JSQEX_parents) {
                var f = d.JSQEX_parents[e];
                f instanceof JSQEXBasicStructure.JSQEX_Room && !b.JSQEX_rooms.includes(f) && b.JSQEX_rooms.push(f)
            }
        }
    }
    return b
};

JSQEXBasicStructure.JSQEX_Site_getAllRoomPoints = function(a) {
    var b = {};
    a ? a.forEach(function(a) {
        a.JSQEX_forEachWall(function(a) {
            b[a.JSQEX_From.ID] = a.JSQEX_From;
            b[a.JSQEX_To.ID] = a.JSQEX_To
        })
    }) : Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachWall(function(a) {
        b[a.JSQEX_From.ID] = a.JSQEX_From;
        b[a.JSQEX_To.ID] = a.JSQEX_To
    });
    a = [];
    for (var c in b)
        a.push(b[c]);
    return a
};

JSQEXBasicStructure.JSQEX_Site_getParentCoEdges = function(a) {
    var b = [];
    if ( a ) {
        Object.keys(a.JSQEX_parents).forEach(function (c) {
            c = a.JSQEX_parents[c];
            b.includes(c) || b.push(c)
        });
    }
    return b
};

JSQEXBasicStructure.JSQEX_Site_tryMergeWallOnPoint = function(a) {
    var b = JSQEXBasicStructure.JSQEX_Site_getParentCoEdges(a);
    if (0 === b.length)
        return !1;
    var b = b[0].JSQEX_edge
        , c = b.JSQEX_findMergedWalls();
    if (!c || 2 > c.JSQEX_merge.length)
        return !1;
    c = c.JSQEX_merge.filter(function(b) {
        return JSQEXMathematics.JSQEX_isSamePoint(b.JSQEX_From, a) || JSQEXMathematics.JSQEX_isSamePoint(b.JSQEX_To, a)
    }, this);
    if (2 !== c.length)
        return !1;
    b.JSQEX_merge(c);
    return !0
};

JSQEXBasicStructure.JSQEX_Site_replace = function(a, b) {
    if (a !== b && JSQEXMathematics.JSQEX_isSamePoint(a, b)) {
        var c = [];
        JSQEXBasicStructure.JSQEX_Site_getParentCoEdges(a).forEach(function(a) {
            a = a.JSQEX_edge;
            c.includes(a) || c.push(a)
        });
        c.forEach(function(c) {
            c.JSQEX_From === a ? c.JSQEX_From = b : c.JSQEX_To === a && (c.JSQEX_To = b)
        })
    }
};

JSQEXBasicStructure.JSQEX_Bound = function(a, b, c, d) {
    JSQEXMathematics.JSQEX_Rect.call(this, a, b, c, d)
};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Bound, JSQEXMathematics.JSQEX_Rect);
JSQEXBasicStructure.JSQEX_Bound.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Bound";
JSQEXBasicStructure.JSQEX_Bound.prototype.JSQEX_isValid = function() {
    return isFinite(this.JSQEX_Top) && isFinite(this.left) && 0 <= this.width && 0 <= this.height
}
;
JSQEXBasicStructure.JSQEX_Bound.prototype.JSQEX_expandMargin = function(a, b) {
    var c = new JSQEXBasicStructure.JSQEX_Bound(this.left,this.JSQEX_Top,this.width,this.height);
    c.left -= a;
    c.JSQEX_Top -= b;
    c.width += 2 * a;
    c.height += 2 * b;
    return c
}
;
JSQEXBasicStructure.JSQEX_Bound.prototype.JSQEX_reset = function() {
    this.JSQEX_Top = this.left = Infinity;
    this.width = this.height = 0
}
;
JSQEXBasicStructure.JSQEX_Bound.prototype.JSQEX_center = function() {
    return {
        x: this.left + .5 * this.width,
        y: this.JSQEX_Top + .5 * this.height
    }
}
;
JSQEXBasicStructure.JSQEX_Bound.prototype.JSQEX_appendPoint = function(a) {
    !isFinite(this.left) || isNaN(this.left) ? (this.left = a.x,
        this.JSQEX_Top = a.y) : (a.x < this.left ? (this.width += this.left - a.x,
        this.left = a.x) : this.width = Math.max(this.width, a.x - this.left),
            a.y < this.JSQEX_Top ? (this.height += this.JSQEX_Top - a.y,
        this.JSQEX_Top = a.y) : this.height = Math.max(this.height, a.y - this.JSQEX_Top))
}
;
JSQEXBasicStructure.JSQEX_Bound.prototype.JSQEX_appendBound = function(a) {
    this.appendPoint({
        x: a.left,
        y: a.JSQEX_Top
    });
    this.appendPoint({
        x: a.left + a.width,
        y: a.JSQEX_Top
    });
    this.appendPoint({
        x: a.left,
        y: a.JSQEX_Top + a.height
    });
    this.appendPoint({
        x: a.left + a.width,
        y: a.JSQEX_Top + a.height
    })
}
;


JSQEXBasicStructure.JSQEX_edge = function( id ) {
    JSQEXBasicStructure.BasicStructure.call( this, id );

    this.JSQEX_From = null;
    this.JSQEX_To = null;

    this.JSQEX_CoEdge = null;
};

JSQEXUtilities.JSQEX_inherits( JSQEXBasicStructure.JSQEX_edge, JSQEXBasicStructure.BasicStructure );

Object.defineProperties(JSQEXBasicStructure.JSQEX_edge.prototype, {
    JSQEX_From: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX_From;
        },
        set: function(b) {
            var d = this._JSQEX_From;
            this._JSQEX_From = b;
            this.JSQEX_onFieldChanged( "JSQEX_From", d, b );
        }
    },

    JSQEX_To: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX_To;
        },
        set: function(b) {
            var d = this._JSQEX_To;
            this._JSQEX_To = b;
            this.JSQEX_onFieldChanged( "JSQEX_To", d, b );
        }
    },

    length: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            var sub = new THREE.Vector2();
            if ( this.JSQEX_From && this.JSQEX_To )
                return sub.subVectors( this.JSQEX_From, this.JSQEX_To).length();
            else {

                return 0;
            }
        }
    },
    JSQEX_middle: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            var mid = new THREE.Vector2();
            return mid.addVectors( this.JSQEX_From, this.JSQEX_To).multiplyScalar(0.5);
        }
    },
    JSQEX_direction: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            var sub = new THREE.Vector2();
            return sub.subVectors( this.JSQEX_To, this.JSQEX_From)
        }
    },
    JSQEX_rotation: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            return -JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(this.JSQEX_From, this.JSQEX_To)
        }
    }
});

JSQEXBasicStructure.JSQEX_edge.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_edge";

JSQEXBasicStructure.JSQEX_edge.JSQEX_create = function(a, b) {

    var c = new JSQEXBasicStructure.JSQEX_edge();
    c.JSQEX_From = a;
    c.JSQEX_To = b;

    if (a.ID == b.ID )
    console.log("same End points");
    return c
};

JSQEXBasicStructure.JSQEX_edge.prototype.JSQEX_getValidCoEdge = function() {
    if (this.JSQEX_CoEdge) {
        if (this.JSQEX_CoEdge.JSQEX_isValid())
            return this.JSQEX_CoEdge;
        var a = this.JSQEX_CoEdge.JSQEX_partner;
        if (a && a.JSQEX_isValid())
            return a
    }
};

JSQEXBasicStructure.JSQEX_edge.prototype.JSQEX_isShared = function() {
    return this.JSQEX_CoEdge && this.JSQEX_CoEdge.JSQEX_isValid() && this.JSQEX_CoEdge.JSQEX_partner && this.JSQEX_CoEdge.JSQEX_partner.JSQEX_isValid()
};

JSQEXBasicStructure.JSQEX_edge.prototype.JSQEX_dump = function(a, structureOnly) {
    //if ( this.JSQEX_removed ) return [];
    var b = JSQEXBasicStructure.JSQEX_edge.superClass_.JSQEX_dump.call(this, a, structureOnly)
        , c = b[0];
    c.JSQEX_From = this.JSQEX_From.ID;
    c.JSQEX_To = this.JSQEX_To.ID;
    this.JSQEX_CoEdge && (c.JSQEX_CoEdge = this.JSQEX_CoEdge.ID);
    return b = b.concat(this.JSQEX_From.JSQEX_dump(a), this.JSQEX_To.JSQEX_dump(a))
};

JSQEXBasicStructure.JSQEX_edge.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_edge.superClass_.JSQEX_load.call(this, a, b);
    this.JSQEX_From = this._JSQEX_loadEntity(b.JSQEX_data[a.JSQEX_From], b);
    this.JSQEX_To = this._JSQEX_loadEntity(b.JSQEX_data[a.JSQEX_To], b);
    a.JSQEX_CoEdge && b.JSQEX_data[a.JSQEX_CoEdge] && (this.JSQEX_CoEdge = this._JSQEX_loadEntity(b.JSQEX_data[a.JSQEX_CoEdge], b),
        this.JSQEX_CoEdge.JSQEX_edge = this)
};

JSQEXBasicStructure.JSQEX_edge.prototype.JSQEX_onFieldChanged = function(name, oldValue, newValue) {

    JSQEXUtilities.JSQEX_dispatchEvent(JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_FieldChanged, {
        mainObj: this,
        JSQEX_fieldName: name,
        JSQEX_oldValue: oldValue,
        JSQEX_newValue: newValue
    });
    if (this.JSQEX_CoEdge)
        this.JSQEX_CoEdge.JSQEX_onFieldChanged(name, oldValue, newValue);
    if (this.JSQEX_CoEdge && this.JSQEX_CoEdge.JSQEX_partner)
        this.JSQEX_CoEdge.JSQEX_partner.JSQEX_onFieldChanged(name, oldValue, newValue)
}
;
JSQEXBasicStructure.JSQEX_edge.prototype.JSQEX_onEntityDirty = function() {
    JSQEXBasicStructure.JSQEX_edge.superClass_.JSQEX_onEntityDirty.call(this);
    this._JSQEX_boundDirty = !0;
    if (this.JSQEX_CoEdge)
        this.JSQEX_CoEdge.JSQEX_onEntityDirty();
    if (this.JSQEX_CoEdge && this.JSQEX_CoEdge.JSQEX_partner)
        this.JSQEX_CoEdge.JSQEX_partner.JSQEX_onEntityDirty();
//    Object.keys(this.openings).forEach(function(a) {
//        this.openings[a].onEntityDirty()
//    }
//        .bind(this))
};

JSQEXBasicStructure.JSQEX_CEdge = function( id ) {
    JSQEXBasicStructure.BasicStructure.call( this, id );
};

JSQEXUtilities.JSQEX_inherits( JSQEXBasicStructure.JSQEX_CEdge, JSQEXBasicStructure.BasicStructure );
JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_create = function(from, to) {
    var edge = new JSQEXBasicStructure.JSQEX_edge( null, from, to );
    var cedge = new JSQEXBasicStructure.JSQEX_CEdge();
    if (from.ID == to.ID )
        console.log( "same End Points" );
    cedge._JSQEX_setEdge( edge );
    return cedge;
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_CEdge";

JSQEXBasicStructure.JSQEX_CEdge.prototype._JSQEX_setEdge = function( edge ) {

    this.JSQEX_edge = edge;
    edge.JSQEX_CoEdge ? (this.JSQEX_partner = edge.JSQEX_CoEdge,
        this.JSQEX_reversed = !edge.JSQEX_CoEdge.JSQEX_reversed) : (edge.JSQEX_CoEdge = this,
        this.JSQEX_reversed = !1);
    this.JSQEX_addChild(edge.JSQEX_From, !1);
    this.JSQEX_addChild(edge.JSQEX_To, !1)
};

Object.defineProperties(JSQEXBasicStructure.JSQEX_CEdge.prototype, {
    JSQEX_prev: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX__prev
        },
        set: function(a) {
            var b = this._JSQEX__prev;
            b !== a && (this._JSQEX__prev = a,
                this.JSQEX_onFieldChanged("JSQEX_prev", b, a),
                b && b.JSQEX_next === this && (b.JSQEX_next = null),
                a && (a.JSQEX_next = this))
        }
    },
    JSQEX_next: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX__next
        },
        set: function(a) {
            var b = this._JSQEX__next;
            b !== a && (this._JSQEX__next =
                a,
                this.JSQEX_onFieldChanged("JSQEX_next", b, a),
                b && b.JSQEX_prev === this && (b.JSQEX_prev = void 0),
                a && (a.JSQEX_prev = this))
        }
    },
    JSQEX_From: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this.JSQEX_reversed ? this.JSQEX_edge.JSQEX_To : this.JSQEX_edge.JSQEX_From
        },
        set: function(a) {
            this.JSQEX_reversed ? this.JSQEX_edge.JSQEX_To = a : this.JSQEX_edge.JSQEX_From = a
        }
    },
    JSQEX_To: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this.JSQEX_reversed ? this.JSQEX_edge.JSQEX_From : this.JSQEX_edge.JSQEX_To
        },
        set: function(a) {
            this.JSQEX_reversed ? this.JSQEX_edge.JSQEX_From = a : this.JSQEX_edge.JSQEX_To = a
        }
    },
    JSQEX_partner: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX_partner
        },
        set: function(a) {
            a !== this._JSQEX_partner && a !== this && (this._JSQEX_partner = a) && (a._JSQEX_partner = this)
            && this.JSQEX_WallMesh && a.JSQEX_WallMesh && this.JSQEX_WallMesh.material.color.setRGB(a.JSQEX_WallMesh.material.color.r,
                a.JSQEX_WallMesh.material.color.g, a.JSQEX_WallMesh.material.color.b)
        }
    },
    JSQEX_fromTangent: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            var sub = new THREE.Vector2();
            return sub.subVectors( this.JSQEX_From, this.JSQEX_To )
        }
    },
    JSQEX_toTangent: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            var sub = new THREE.Vector2();
            return sub.subVectors( this.JSQEX_To, this.JSQEX_From )
        }
    },
    JSQEX_direction: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            var sub = new THREE.Vector2();
            return sub.subVectors( this.JSQEX_To, this.JSQEX_From )
        }
    },
    JSQEX_middle: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            return this.JSQEX_edge.JSQEX_middle
        }
    },
    length: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            return this.JSQEX_edge.length
        }
    },
    rotation: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            return -JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(this.JSQEX_From, this.JSQEX_To)
        }
    }
});

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_isValid = function() {
    return this.JSQEX_parents[Object.keys(this.JSQEX_parents)[0]] && !this.JSQEX_removed && !this.JSQEX_hided;
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_removeChild = function(a, b) {
    var c = JSQEXBasicStructure.JSQEX_CEdge.superClass_.JSQEX_removeChild.call(this, a, b);
    c && c instanceof JSQEXBasicStructure.JSQEX_Site && c._JSQEX_invalidateSubgraph();
    return c
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_removeAllChildren = function(a) {
    JSQEXBasicStructure.JSQEX_CEdge.superClass_.JSQEX_removeAllChildren.call(this, a);
    this.JSQEX_edge.JSQEX_removeAllChildren(a)
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_onFieldChanged = function( name, oldValue, newValue ) {
    this._JSQEX_boundDirty = !0;
    JSQEXUtilities.JSQEX_dispatchEvent(JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_FieldChanged, {
        mainObj: this,
        JSQEX_fieldName: name,
        JSQEX_oldValue: oldValue,
        JSQEX_newValue: newValue
    });
    var d = "JSQEX_next" === name || "JSQEX_prev" === name;
    (name = "JSQEX_From" === name || "JSQEX_To" === name) && this.JSQEX_replaceChild(oldValue ? oldValue.ID : void 0, newValue);
    (d || name) && this._JSQEX_invalidateSubgraph()
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_getConnectedEdges = function() {
    var b = this,
        a = []
        , c = function(c) {
            Object.keys(c.JSQEX_parents).forEach(function(e) {
                e = c.JSQEX_parents[e];

                e === b || a.includes(e) || a.push(e)
            })
        }
        ;
    c(this.JSQEX_From);
    c(this.JSQEX_To);
    return a
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_updateConnectedEdges = function() {
    var a = this.JSQEX_getConnectedEdges();
    a.forEach(function(b) {
        if (b.JSQEX_isValid()) {
            b.JSQEX_onEntityDirty();
            if (b.JSQEX_prev && !a.includes(b.JSQEX_prev))
                b.JSQEX_prev.JSQEX_onEntityDirty();
            if (b.JSQEX_next && !a.includes(b.JSQEX_next))
                b.JSQEX_next.JSQEX_onEntityDirty()
        }
    })
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_dump = function(a, structureOnly) {
    //if ( this.JSQEX_removed ) return [];
    var b = JSQEXBasicStructure.JSQEX_CEdge.superClass_.JSQEX_dump.call(this, a, structureOnly)
        , c = b[0];
    c.JSQEX_edge = this.JSQEX_edge ? this.JSQEX_edge.ID : void 0;
    c.JSQEX_partner = this.JSQEX_partner ? this.JSQEX_partner.ID : void 0;
    c.JSQEX_reversed = this.JSQEX_reversed;
    c.JSQEX_next = this.JSQEX_next ? this.JSQEX_next.ID : void 0;
    c.JSQEX_prev = this.JSQEX_prev ? this.JSQEX_prev.ID : void 0;
    return b = b.concat(this.JSQEX_edge.JSQEX_dump(a))
};

JSQEXBasicStructure.JSQEX_CEdge.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_CEdge.superClass_.JSQEX_load.call(this, a, b);

    var c = a.JSQEX_prev
        , d = a.JSQEX_next
        , e = a.JSQEX_edge
        , f = a.JSQEX_partner;
    e && b.JSQEX_data[e] && (this.JSQEX_edge = this._JSQEX_loadEntity(b.JSQEX_data[e], b));
    void 0 !== a.JSQEX_reversed && (this.JSQEX_reversed = a.JSQEX_reversed);
    c && (this.JSQEX_prev = this._JSQEX_loadEntity(b.JSQEX_data[c], b));
    d && (this.JSQEX_next = this._JSQEX_loadEntity(b.JSQEX_data[d], b));
    f && (this.JSQEX_partner = this._JSQEX_loadEntity(b.JSQEX_data[f], b))

};

JSQEXBasicStructure.JSQEX_Wall = function(id) {
    JSQEXBasicStructure.JSQEX_edge.call(this, id);
    this.JSQEX_height3d = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_WallDefaultHeight;

    this.JSQEX_embedFurns = {};
    this.JSQEX_OpenHoles = {};

    this.JSQEX_width = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_WallDefaultWidth;// * ( Math.random() + 0.5 );

    this.JSQEX_isBear = !1;

    this.JSQEX_heightEditable = false;

};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Wall, JSQEXBasicStructure.JSQEX_edge);

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Wall";
JSQEXBasicStructure.JSQEX_Wall.JSQEX_create = function(a, b, width) {
    var c = new JSQEXBasicStructure.JSQEX_Wall();
    c.JSQEX_From = a;
    c.JSQEX_To = b;
    if ( width ) c.JSQEX_width = width;
    if (a.ID == b.ID )
    console.log( "same end edge" );
    return c
};

Object.defineProperties(JSQEXBasicStructure.JSQEX_Wall.prototype, {
    JSQEX_sidePaths: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            this._JSQEX_sidePaths = this._JSQEX_getSidePaths();
            return this._JSQEX_sidePaths
        }
    },
    JSQEX_width: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX_width
        },
        set: function(a) {
            var b = this._JSQEX_width;
            a !== b && (this._JSQEX_width = a,
                this.JSQEX_adjustContent(),
                JSQEXBasicStructure.BasicStructure.JSQEX_defaultFieldChangedCallback(this, "JSQEX_width", b, a))
        }
    },
    JSQEX_heightEditable: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX_heightEditable
        },
        set: function(a) {
            var b = this._JSQEX_heightEditable;
            a !== b && (this._JSQEX_heightEditable = a,
                JSQEXBasicStructure.BasicStructure.JSQEX_defaultFieldChangedCallback(this, "JSQEX_heightEditable", b, a))
        }
    },
    JSQEX_isBear: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function() {
            return this._JSQEX_isBear
        },
        set: function(a) {
            var b = this._JSQEX_isBear;
            a !== b && (this._JSQEX_isBear = a,
                JSQEXBasicStructure.BasicStructure.JSQEX_defaultFieldChangedCallback(this, "JSQEX_isBear", b, a))


            if ( this.JSQEX_CoEdge && this.JSQEX_CoEdge.JSQEX_WallMesh && this.JSQEX_CoEdge.JSQEX_WallMesh.material ) {
                a ? this.JSQEX_CoEdge.JSQEX_WallMesh.material.color.setRGB( JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_BearEdgeColor ) :
                    this.JSQEX_CoEdge.JSQEX_WallMesh.material.color.setHex( JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_EdgeColor );
            }

        }
    }
});

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_onFieldChanged = function(a, b, c) {
    this._JSQEX_boundDirty = !0;
    JSQEXBasicStructure.JSQEX_Wall.superClass_.JSQEX_onFieldChanged.call(this, a, b, c);
    c = b = !1;
    "JSQEX_width" === a ? c = b = !0 : "JSQEX_height3d" === a ? b = !0 : c = b = !0;
    if (a = this.JSQEX_CoEdge)
        b && (a._JSQEX_invalidateSubgraph(),
            a.JSQEX_partner && a.JSQEX_partner._JSQEX_invalidateSubgraph()),
            c && (a.JSQEX_updateConnectedEdges(),
            this.JSQEX_From.JSQEX_onEntityDirty(),
            this.JSQEX_To.JSQEX_onEntityDirty())
};

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_Wall.superClass_.JSQEX_load.call(this, a, b);
    this.JSQEX_height3d = a.JSQEX_height3d;
    this.JSQEX_width = a.JSQEX_width;
    this.JSQEX_heightEditable = a.JSQEX_heightEditable;
    //a.JSQEX_pattern && (this.JSQEX_pattern = a.JSQEX_pattern);
    //a.wallType && (this.wallType = a.wallType);
    a.JSQEX_isBear && (this.JSQEX_isBear = a.JSQEX_isBear);

};

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_dump = function(a, structureOnly) {
    //if ( this.JSQEX_removed ) return [];
    var b = JSQEXBasicStructure.JSQEX_Wall.superClass_.JSQEX_dump.call(this, a, structureOnly)
        , c = b[0];
    c.JSQEX_width = this.JSQEX_width;
    c.JSQEX_height3d = this.JSQEX_height3d;
    //c.wallType = this.wallType;
    c.JSQEX_heightEditable = this.JSQEX_heightEditable;
    c.JSQEX_isBear = this.JSQEX_isBear;
    /** to be reconsidered **/
//    for (var d in this.JSQEX_embedFurns)
//        b = b.concat(this.JSQEX_embedFurns[d].JSQEX_dump(a));
//    for (var e in this.JSQEX_OpenHoles)
//        b = b.concat(this.JSQEX_OpenHoles[e].JSQEX_dump(a));
//    a && a(b, this);

    /** to be reconsidered **/
    return b
};

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_addChild = function(a, b) {
    if (a)
        return  JSQEXBasicStructure.JSQEX_Wall.superClass_.JSQEX_addChild.call(this, a, b)
};

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_addContent = function(a) {
    /** to be reconsidered **/
//    if (a)
//        return a instanceof JSQEXBasicStructure.JSQEX_Opening ? (this.openings[a.ID] = a,
//            this.signalOpeningAdded.dispatch({
//                opening: a
//            })) : a instanceof JSQEXBasicStructure.JSQEX_Content && (this.contents[a.ID] = a),
//            a

    /** to be reconsidered **/
};

JSQEXBasicStructure.JSQEX_Wall.prototype.removeContent = function(a) {
    /** to be reconsidered **/
//    if (a = this.contents[a] || this.openings[a])
//        return a instanceof JSQEXBasicStructure.JSQEX_Opening ? (delete this.openings[a.ID],
//            this.signalOpeningRemoved.dispatch({
//                opening: a
//            })) : a instanceof JSQEXBasicStructure.JSQEX_Content && delete this.contents[a.ID],
//            a
    /** to be reconsidered **/
};

JSQEXBasicStructure.JSQEX_Wall.prototype._JSQEX_getSidePaths = function() {
    var a = function(a, b, e) {
            e = b - e;
            0 > e && (e += a.length);
            var f, g = [];
            for (f = 0; f <= e; f++)
                g.push(a[(a.length + b - f) % a.length]);
            return g
        }
        , b = function(a, b) {
            var e;
            switch (a) {
                case JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_From:
                    e = b.JSQEX_From;
                    break;
                case JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_To:
                    e = b.JSQEX_To;
                    break;
                default:
                    return !1
            }
            return 1 !== JSQEXBasicStructure.JSQEX_Site_getParentCoEdges(e).length
        }
        ;
    return function() {
        var c = this;
        if (!JSQEXMathematics.JSQEX_isSamePoint(c.JSQEX_From, c.JSQEX_To)) {
            var d, e;
            var geo = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry( this.JSQEX_CoEdge );
            e = a(geo.JSQEX_geometry, geo.JSQEX_indices[0], geo.JSQEX_indices[3]);
            d = b(JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_From, c) ? this._JSQEX_splitPathByLine(c.JSQEX_From, c.JSQEX_To, e) : {
                JSQEX_left: e,
                JSQEX_right: []
            };
            e = a(geo.JSQEX_geometry, geo.JSQEX_indices[2], geo.JSQEX_indices[1]);
            c = b(JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_To, c) ? this._JSQEX_splitPathByLine(c.JSQEX_From, c.JSQEX_To, e) : {
                JSQEX_left: e,
                JSQEX_right: []
            };
            return {
                JSQEX_From: d.JSQEX_left,
                JSQEX_To: c.JSQEX_left,
                JSQEX_outerfrom: d.JSQEX_right,
                JSQEX_outerto: c.JSQEX_right
            }
        }
    }
}();

JSQEXBasicStructure.JSQEX_Wall.prototype._JSQEX_splitPathByLine = function(a, b, c) {
    if (!JSQEXMathematics.JSQEX_isSamePoint(a, b)) {
        var d = THREE.Vector2.JSQEX_difference(b, a), e, f, g, h;
        g = 0;
        for (h = c.length; g < h; g++) {
            e = THREE.Vector2.JSQEX_difference(c[g], a);
            e = d.x * e.y - d.y * e.x;
            if (f && 0 > f * e || JSQEXMathematics.JSQEX_isZero(e))
                break;
            f = e
        }
        var m = g === h ? h - 1 : g;
        g = [];
        var n = [];
        if (0 === m || m === h - 1)
            return JSQEXMathematics.JSQEX_isZero(e) && (e = THREE.Vector2.JSQEX_difference(c[h - 1 - m], a),
                e = d.x * e.y - d.y * e.x),
                    0 < e ? g = c : n = c,
            {
                JSQEX_left: g,
                JSQEX_right: n
            };
        0 < f ? (g = c.slice(0, m),
            n = c.slice(m)) : (n = c.slice(0, m),
            g = c.slice(m));
        JSQEXMathematics.JSQEX_isZero(e) ? 0 < f ? g.push(c[m]) : n.push(c[m]) : (a = JSQEXMathematics.JSQEX_lineLineIntersection(c[m - 1], c[m], a, b),
                0 < f ? (g.push(a),
            n.unshift(a)) : (n.push(a),
            g.unshift(a)));
        return {
            JSQEX_left: g,
            JSQEX_right: n
        }
    }
};
//JSQEXBasicStructure.JSQEX_Wall.prototype.refreshBoundInternal = function() {
//    var a = this.boundInternal;
//    a.reset();
//    var b = goog.math.Vec2.JSQEX_FromCoordinate(this.JSQEX_From)
//        , c = this.direction
//        , d = this.width;
//    if (c)
//        if (assert(!isNaN(c.x)),
//            0 === goog.math.Vec2.dot(c, c))
//            a.appendPoint(b),
//                this.outline = [b];
//        else
//            for (b = c.normalize().scale(d / 2),
//                     this.outline[0] = goog.math.Vec2.rotateAroundPoint(b.clone().add(this.JSQEX_From), this.JSQEX_From, Math.PI / 2),
//                     this.outline[1] = goog.math.Vec2.rotateAroundPoint(b.clone().add(this.JSQEX_To), this.JSQEX_To, Math.PI / 2),
//                     this.outline[2] = goog.math.Vec2.rotateAroundPoint(b.clone().add(this.JSQEX_To),
//                         this.JSQEX_To, -Math.PI / 2),
//                     this.outline[3] = goog.math.Vec2.rotateAroundPoint(b.clone().add(this.JSQEX_From), this.JSQEX_From, -Math.PI / 2),
//                     b = 0; 4 > b; ++b)
//                a.appendPoint(this.outline[b]);
//    else
//        assert(!1, "We got unwanted wall, please check!!")
//}
//;
JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_splitByLerpNumber = function(a, b) {
    if (!(.3 > this.length || 0 > a || 1 < a)) {
        var c = new JSQEXBasicStructure.JSQEX_Site.JSQEX_create( new THREE.Vector2( JSQEXMathematics.JSQEX_lerp(this.JSQEX_From.x, this.JSQEX_To.x, a), JSQEXMathematics.JSQEX_lerp(this.JSQEX_From.y, this.JSQEX_To.y, a) ) )
            , d = this.JSQEX_splitByPoint(c, b);
        if (!(1 < d.length))
            return {
                JSQEX_point: c,
                JSQEX_walls: d
            }
    }
};
JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_splitByPoint = function(a, b) {
    return this.JSQEX_splitByPoints([a], b)
};
JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_splitByPoints = function(a, b) {
    var c = [];
    if (.01 > this.length)
        return c;
    var d = this.JSQEX_getValidCoEdge();
    if (!d)
        return c;
    var e = [];
    a.forEach(function(a) {
        if (!JSQEXMathematics.JSQEX_isSamePoint(a, this.JSQEX_From) && !JSQEXMathematics.JSQEX_isSamePoint(a, this.JSQEX_To)) {
            var b = JSQEXMathematics.JSQEX_getLerpNumber(d.JSQEX_From, d.JSQEX_To, a);
            0 < b && 1 > b && e.push({
                JSQEX_point: a,
                JSQEX_lerp: b
            })
        }
    }, this);
    if (0 === e.length)
        return c;
    e.push({
        JSQEX_point: d.JSQEX_To,
        JSQEX_lerp: 1
    });
    var f = [];
    e.forEach(function(a) {
        for (var b = !1, c = 0; c < f; c++)
            if (.01 > Math.abs(f[c].JSQEX_lerp - a.JSQEX_lerp)) {
                b = !0;
                break
            }
        b || f.push(a)
    });
    if (2 > f.length)
        return c;
    var f = f.sort(function(a, b) {
            return a.JSQEX_lerp - b.JSQEX_lerp
        })
        , g = f[0].JSQEX_point;
    d.JSQEX_To = b ? JSQEXBasicStructure.JSQEX_Site.JSQEX_create(g) : g;
    for (g = 0; g < f.length - 1; g++) {
        var h = f[g].JSQEX_point
            , m = f[g + 1].JSQEX_point;
        .01 > JSQEXMathematics.JSQEX_pointLength(h, m) || (b && (h = JSQEXBasicStructure.JSQEX_Site.JSQEX_create( h ),
            m = JSQEXBasicStructure.JSQEX_Site.JSQEX_create( m )),
            h = JSQEXBasicStructure.JSQEX_Wall.JSQEX_create(h, m),
            JSQEXBasicStructure.JSQEX_CWall.JSQEX_create(h, d),

            d.JSQEX_partner && JSQEXBasicStructure.JSQEX_CWall.JSQEX_create(h, d.JSQEX_partner),
            c.push(h))
    }
    var n = function(a, b) {

            if (a && b && a.JSQEX_isValid()) {
                var c = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]];
                c instanceof
                JSQEXBasicStructure.JSQEX_Room && (a.JSQEX_To === b.JSQEX_From ? (a.JSQEX_next && (a.JSQEX_next.JSQEX_prev = b),
                    a.JSQEX_next = b) : a.JSQEX_From === b.JSQEX_To ? (a.JSQEX_prev && (a.JSQEX_prev.JSQEX_next = b),
                    a.JSQEX_prev = b) : a.JSQEX_To === b.JSQEX_To ? (b.JSQEX_reversed = !b.JSQEX_reversed,
                    a.JSQEX_next && (a.JSQEX_next.JSQEX_prev = b),
                    a.JSQEX_next = b) : a.JSQEX_From === b.JSQEX_From && (b.JSQEX_reversed = !b.JSQEX_reversed,
                    a.JSQEX_prev && (a.JSQEX_prev.JSQEX_next = b),
                    a.JSQEX_prev = b));
                c && c.JSQEX_addChild(b)
            }
        }
        , p = this;
    c.forEach(function(a) {
        var b = p;
        JSQEXMathematics.JSQEX_isSamePoint(b.JSQEX_To, a.JSQEX_From) && b.JSQEX_To !== a.JSQEX_From ? a.JSQEX_From = b.JSQEX_To : JSQEXMathematics.JSQEX_isSamePoint(b.JSQEX_From, a.JSQEX_To) && b.JSQEX_From !== a.JSQEX_To ? a.JSQEX_To = b.JSQEX_From : JSQEXMathematics.JSQEX_isSamePoint(b.JSQEX_From, a.JSQEX_From) && b.JSQEX_From !== a.JSQEX_From ?
            a.JSQEX_From = b.JSQEX_From : JSQEXMathematics.JSQEX_isSamePoint(b.JSQEX_To, a.JSQEX_To) && b.JSQEX_To !== a.JSQEX_To && (a.JSQEX_To = b.JSQEX_To);
        n(b.JSQEX_CoEdge, a.JSQEX_CoEdge);
        n(b.JSQEX_CoEdge.JSQEX_partner, a.JSQEX_CoEdge.JSQEX_partner);
        p = a
    });
    /**to be reconsidered**/
    var q = [];
    var scope = this;
    Object.keys( this.JSQEX_embedFurns ).forEach(function(a) {
        scope.JSQEX_embedFurns[ a ] && q.push(scope.JSQEX_embedFurns[ a ])
    });
    Object.keys( this.JSQEX_OpenHoles ).forEach(function(a) {
        scope.JSQEX_OpenHoles[ a ] && q.push(scope.JSQEX_OpenHoles[ a ])
    });
    q.forEach(function(a) {
        var p = new THREE.Vector2(a.position.x, a.position.z);
        for (var b = this, d = JSQEXMathematics.JSQEX_closestDistanceToSegment(p, this.JSQEX_From, this.JSQEX_To), e = 0, f = c.length; e < f; e++) {
            var g = c[e]
                , h = JSQEXMathematics.JSQEX_closestDistanceToSegment(p, g.JSQEX_From, g.JSQEX_To);
            if (d > h)
                d = h,
                    b = g;
            else
                break
        }
        b.JSQEX_CoEdge && b.JSQEX_CoEdge.JSQEX_assignContent(a)
    }, this);

    return c
};
JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_findCommonWalls = function(a) {
    if (!this.JSQEX_getValidCoEdge())
        return [];
    var b = [this]
        , c = this;



    Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachWall(function(d) {
        d.JSQEX_edge.ID !== c.ID && d.JSQEX_isValid() &&
        (!a || d.JSQEX_getParentRoom())
        && JSQEXMathematics.JSQEX_isParallel(c.JSQEX_From, c.JSQEX_To, d.JSQEX_From, d.JSQEX_To, .01)
        && JSQEXMathematics.JSQEX_isPointInLine(c.JSQEX_From, d.JSQEX_From, d.JSQEX_To, .01) && -.01 > Math.max((new JSQEXMathematics.JSQEX_Line(c.JSQEX_From.x,c.JSQEX_From.y,d.JSQEX_From.x,d.JSQEX_From.y)).JSQEX_getSegmentLength(),
            (new JSQEXMathematics.JSQEX_Line(c.JSQEX_From.x,c.JSQEX_From.y,d.JSQEX_To.x, d.JSQEX_To.y)).JSQEX_getSegmentLength(),
            (new JSQEXMathematics.JSQEX_Line(c.JSQEX_To.x, c.JSQEX_To.y, d.JSQEX_From.x, d.JSQEX_From.y)).JSQEX_getSegmentLength(),
            (new JSQEXMathematics.JSQEX_Line(c.JSQEX_To.x, c.JSQEX_To.y, d.JSQEX_To.x, d.JSQEX_To.y)).JSQEX_getSegmentLength()) - c.length - d.length && !b.includes(d.JSQEX_edge) && b.push(d.JSQEX_edge)
    });
    return b
};

JSQEXBasicStructure.JSQEX_Wall.JSQEX_wallInSameRoom = function(a, b) { //判断两个墙体是否相关联
    var c = []
        , d = a.JSQEX_CoEdge.JSQEX_getParentRoom();
    d && c.push(d);
    (d = a.JSQEX_CoEdge.JSQEX_partner) && (d = d.JSQEX_getParentRoom()) && c.push(d);
    return (d = b.JSQEX_CoEdge.JSQEX_getParentRoom()) && c.includes(d) || (d = b.JSQEX_CoEdge.JSQEX_partner) && (d = d.JSQEX_getParentRoom()) && c.includes(d) ? !0 : !1
};

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_eliminateCommonWalls = function() {
    if (!this.JSQEX_isShared() && this.JSQEX_getValidCoEdge()) {
        for (var a = this.JSQEX_findCommonWalls(), b = [this], c = 0; c < a.length; c++) {
            var d = a[c];
            d.JSQEX_isShared() || JSQEXBasicStructure.JSQEX_Wall.JSQEX_wallInSameRoom(d, this) || b.includes(d) || b.push(d)
        }
        if (!(2 > b.length)) {
            var e = [];
            b.forEach(function(a) {
                e.push(a.JSQEX_From, a.JSQEX_To)
            });
            var f = [];
            e.forEach(function(a) {
                for (var b = !0, c = 0; c < f.length; c++) {
                    var d = f[c];
                    if (JSQEXMathematics.JSQEX_isSamePoint(d, a, .01)) {
                        d !== a && JSQEXBasicStructure.JSQEX_Site_replace(a, d);
                        b = !1;
                        break
                    }
                }
                b && f.push(a)
            });
            var g =
                    this
                , f = f.sort(function(a, b) {
                    var c = JSQEXMathematics.JSQEX_getLerpNumber(g.JSQEX_CoEdge.JSQEX_From, g.JSQEX_CoEdge.JSQEX_To, a)
                        , d = JSQEXMathematics.JSQEX_getLerpNumber(g.JSQEX_CoEdge.JSQEX_From, g.JSQEX_CoEdge.JSQEX_To, b);
                    return c - d
                })
                , h = [];
            b.forEach(function(a) {
                var b = [];
                f.forEach(function(c) {
                    JSQEXMathematics.JSQEX_isSamePoint(c, a.JSQEX_CoEdge.JSQEX_From, .01) || JSQEXMathematics.JSQEX_isSamePoint(c, a.JSQEX_CoEdge.JSQEX_To, .01) || !JSQEXMathematics.JSQEX_isPointInLineSegment(c, a.JSQEX_CoEdge.JSQEX_From, a.JSQEX_CoEdge.JSQEX_To, .01) || b.push(c)
                });
                var c = a.JSQEX_splitByPoints(b, !1);
                c.unshift(a);
                h = h.concat(c)
            });
            a = [];
            for (c = 0; c < f.length - 1; c++) {
                var m = f[c]
                    , n =
                        f[c + 1]
                    , p = [];
                h.forEach(function(a) {
                    JSQEXMathematics.JSQEX_isSameLineSegment(a.JSQEX_CoEdge.JSQEX_From, a.JSQEX_CoEdge.JSQEX_To, m, n) && p.push(a)
                });
                a.push(p)
            }
            var q = function(a, b, c) {
                    var d = a.JSQEX_prev
                        , e = a.JSQEX_next;
                    JSQEXMathematics.JSQEX_isSamePoint(a.JSQEX_From, b.JSQEX_To, .01) && (b.JSQEX_reversed = !b.JSQEX_reversed);
                    d.JSQEX_next = b;
                    d.JSQEX_To = b.JSQEX_From;
                    e.JSQEX_prev = b;
                    e.JSQEX_From = b.JSQEX_To;
                    (d = b.JSQEX_parents[Object.keys(b.JSQEX_parents)[0]]) && d !== c ? b.JSQEX_replaceParent(d, c) : c.JSQEX_addChild(b);
                    b.JSQEX_copyProperty(a);

                    var d = a.JSQEX_edge, f = b.JSQEX_edge;

                    if (d !== f) {
                        var g = [];
                        Object.keys( d.JSQEX_embedFurns ).forEach(function(a) {
                            d.JSQEX_embedFurns[a] && g.push(d.JSQEX_embedFurns[a])
                        });
                        Object.keys( d.JSQEX_OpenHoles ).forEach(function(a) {
                            d.JSQEX_OpenHoles[a] && g.push(d.JSQEX_OpenHoles[a])
                        });
                        g.forEach(function(a) {
                            b.JSQEX_assignContent(a)
                        })
                    }

                    c.JSQEX_root ===
                    a && (c.JSQEX_root = b)
                }
                , r = function(a) {
                    if (!(2 > a.length)) {
                        for (; 2 < a.length; )
                            a.pop();
                        var b = a[0].JSQEX_getValidCoEdge().JSQEX_getParentRoom()
                            , c = a[1].JSQEX_getValidCoEdge().JSQEX_getParentRoom()
                            , d = !(!b || !c)
                            , e = a[0] === g ? a[0] : a[1]
                            , f = e.JSQEX_getValidCoEdge()
                            , h = f.JSQEX_partner;
                        a.forEach(function(a) {
                            if (a !== e) {
                                a = a.JSQEX_getValidCoEdge();
                                var b = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]];

                                b instanceof JSQEXBasicStructure.JSQEX_Room ? (d && !h && (h = JSQEXBasicStructure.JSQEX_CWall.JSQEX_create(e)),
                                    b.JSQEX_root === a && (b.JSQEX_root = a.JSQEX_next),
                                    h ? q(a, h, b) : q(a, f, b),
                                    b.JSQEX_removeChild(a.ID),
                                    a.JSQEX_prev = void 0,
                                    a.JSQEX_next = void 0,
                                    h && b.JSQEX_addChild(h, !0)) :
                                    (a.JSQEX_prev = void 0,
                                        a.JSQEX_next = void 0,
                                        b.JSQEX_removeChild(a.ID))
                            }
                        })
                    }
                }
                ;
            a.forEach(function(a) {
                r(a)
            })
        }
    }
};
JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_findMergedWalls = function() {
    var a = this.JSQEX_getValidCoEdge();
    if (a) {
        for (var b = function(a) {
                var b = [];
                JSQEXBasicStructure.JSQEX_Site_getPointOwner(a).JSQEX_walls.forEach(function(a) {
                    b.includes(a.JSQEX_edge) || b.push(a.JSQEX_edge)
                });
                return b
            }
                 , c = [this], d = function(a, c, d) {
                var e;
                c = c ? a.JSQEX_prev : a.JSQEX_next;
                d = b(d);
                c ? e = c : d.some(function(b) {
                    b !== a.JSQEX_edge && (e = b.JSQEX_getValidCoEdge());
                    return e
                });
                if (e && e.JSQEX_isValid() && 2 === d.length)
                    return e
            }
                 , e = a, f = a.JSQEX_To, g = d(a, !1, f); g && g.ID !== a.ID; )
            if (this._JSQEX_canMerge(e.JSQEX_edge, g.JSQEX_edge))
                c.push(g.JSQEX_edge),
                    e = g,
                    f = e.JSQEX_From === f ? e.JSQEX_To :
                        e.JSQEX_From,
                    g = d(e, !1, f);
            else
                break;
        for (var e = a, f = a.JSQEX_From, h = d(a, !0, f); h && h.ID !== a.ID; )
            if (this._JSQEX_canMerge(e.JSQEX_edge, h.JSQEX_edge))
                c.unshift(h.JSQEX_edge),
                    e = h,
                    f = e.JSQEX_From === f ? e.JSQEX_To : e.JSQEX_From,
                    h = d(e, !0, f);
            else
                break;
        return {
            first: h,
            JSQEX_merge: c,
            last: g
        }
    }
};
JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_merge = function(a) {
    if (!(2 > a.length)) {
        for (var b = [], c = a[a.length - 1], d = function(a, b) {
                var c = a.JSQEX_From;
                if (b.JSQEX_From === c || b.JSQEX_To === c)
                    c = a.JSQEX_To;
                return c
            }
                 , e = d(a[0], a[1]), c = d(c, a[a.length - 2]), d = function(a) {
                if (a) {
                    var b = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]];
                    if (b)

                        if (b instanceof JSQEXBasicStructure.JSQEX_Room)
                            b.JSQEX_removeEdge(a);
                        else {
                            var c = a.JSQEX_prev
                                , d = a.JSQEX_next;
                            a.JSQEX_next = void 0;
                            a.JSQEX_prev = void 0;
                            b.JSQEX_removeChild(a.ID);
                            c && (c.JSQEX_next = d)
                        }
                }
            }
                 , f = 0; f < a.length; ++f) {
            var g = a[f];
            if (g.ID !== this.ID) {
                var h = g.JSQEX_CoEdge.JSQEX_partner;
                d(g.JSQEX_CoEdge);
                d(h);
                var m = [];

                Object.keys( g.JSQEX_embedFurns).forEach(function(a) {
                    g.JSQEX_embedFurns[a] && m.push(g.JSQEX_embedFurns[a])
                });
                Object.keys( g.JSQEX_OpenHoles).forEach(function(a) {
                    g.JSQEX_OpenHoles[a] && m.push(g.JSQEX_OpenHoles[a])
                });
                var scope = this;
                m.forEach(function(a) {

                    scope.JSQEX_CoEdge && scope.JSQEX_CoEdge.JSQEX_assignContent(a);
                });

                b.includes(g) || b.push(g)
            }
        }
        a = this.JSQEX_getValidCoEdge();
        a.JSQEX_prev ? a.JSQEX_From !== a.JSQEX_prev.JSQEX_To && (a.JSQEX_From = a.JSQEX_prev.JSQEX_To) : a.JSQEX_From = e;
        a.JSQEX_next ? a.JSQEX_To !== a.JSQEX_next.JSQEX_From && (a.JSQEX_To = a.JSQEX_next.JSQEX_From) : a.JSQEX_To = c;
        return b
    }
};
JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_tryMerge = function() {
    var a = this.JSQEX_findMergedWalls();
    if (a)
        return this.JSQEX_merge(a.JSQEX_merge)
};
JSQEXBasicStructure.JSQEX_Wall.prototype._JSQEX_canMerge = function(a, b) {
    return (a.JSQEX_From === b.JSQEX_To || a.JSQEX_To === b.JSQEX_From || a.JSQEX_From === b.JSQEX_From || a.JSQEX_To === b.JSQEX_To) 
        && (.01 > b.length || JSQEXMathematics.JSQEX_isSameLine(this.JSQEX_From, this.JSQEX_To, b.JSQEX_From, b.JSQEX_To))
        && this.JSQEX_isShared() === b.JSQEX_isShared()
        && (!this.JSQEX_isShared() || this._JSQEX_isSharedBySameRoom(b))
        && this.JSQEX_isBear === b.JSQEX_isBear
        && JSQEXMathematics.JSQEX_nearlyEquals(this.JSQEX_width, b.JSQEX_width)
        && JSQEXMathematics.JSQEX_nearlyEquals(this.JSQEX_height3d, b.JSQEX_height3d)
};
JSQEXBasicStructure.JSQEX_Wall.prototype._JSQEX_isSharedBySameRoom = function(a) {
    var b = this.JSQEX_getValidCoEdge();
    if (b && this.JSQEX_isShared() && a.JSQEX_isShared()) {
        var c = b.JSQEX_getParentRoom()
            , b = b.JSQEX_partner.JSQEX_getParentRoom()
            , d = a.JSQEX_CoEdge.JSQEX_getParentRoom();
        a = a.JSQEX_CoEdge.JSQEX_partner.JSQEX_getParentRoom();
        var e = !1;
        d && a && (e = d === c && a === b || d === b && a === c);
        return e
    }
    return !1
};

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_forEachContent = function(a, b) {
    Object.keys(this.JSQEX_embedFurns).forEach(function(c) {
        a.call(b, this.JSQEX_embedFurns[c])
    }, this);
    Object.keys(this.JSQEX_OpenHoles).forEach(function(c) {
        a.call(b, this.JSQEX_OpenHoles[c])
    }, this)
};

JSQEXBasicStructure.JSQEX_Wall.prototype.JSQEX_adjustContent = function() {
    this.JSQEX_forEachContent( function( c ) {
        if (c.isAttPlane ) {
            var dir = this.JSQEX_direction;
            var v = ( new THREE.Vector3() ).set(dir.x, 0, dir.y );
            var angle = v.angleTo(new THREE.Vector3(1, 0, 0));
            c.rotation.y = ( v.z > 0 ) ? -angle : angle;
            c.position = JSQEXMathematics.JSQEX_projectOnWall( this.JSQEX_From, this.JSQEX_To, c.position, this.JSQEX_width / 2 + 0.01 );
        }
        else c.rotation.y = JSQEXMathematics.JSQEX_toRadians( JSQEXMathematics.JSQEX_getNearestParallelAngle(JSQEXMathematics.JSQEX_toDegrees( c.rotation.y ), this.JSQEX_rotation) );

        if (c.profile ) {
            c.profile.rotation.z = c.rotation.y;
            c.profile.position.x = c.position.x;
            c.profile.position.z = c.position.z;
            JSQEX_setProfile( c );
        }
    }, this )

};

JSQEXBasicStructure.JSQEX_CWall = function(a) {
    JSQEXBasicStructure.JSQEX_CEdge.call(this, a);
    this.JSQEX_WallMesh = null;
    this.JSQEX_pattern = {};
    this.JSQEX_moldings = new Map;
    //Engine.mainInterface.JSQEX_structureInfos.JSQEX_CoWallGroup[this.ID] = this;
};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_CWall,JSQEXBasicStructure.JSQEX_CEdge);

Object.defineProperties(JSQEXBasicStructure.JSQEX_CWall.prototype, {
    JSQEX_width: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function () {
            return this.JSQEX_edge.JSQEX_width
        },
        set: function (w) {
            this.JSQEX_edge.JSQEX_width = w;
        }
    },

    JSQEX_height3d: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function () {
            return this.JSQEX_edge.JSQEX_height3d
        },
        set: function (h) {
            this.JSQEX_edge.JSQEX_height3d = h
        }
    },

    JSQEX_isBear: {
        writeable: !0,
        enumerable: !0,
        configurable: !1,
        get: function () {
            return this.JSQEX_edge.JSQEX_isBear
        },
        set: function (a) {
            this.JSQEX_edge.JSQEX_isBear = a
        }
    }
} );

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_CWall";

JSQEXBasicStructure.JSQEX_CWall.JSQEX_create = function(a, b) {
    var c = new JSQEXBasicStructure.JSQEX_CWall();

    c._JSQEX_setEdge(a);
    b && c.JSQEX_copyProperty(b);
    //console.log( "CWall recalled: " + c.ID )
    return c
};


JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints = function(a, b, c) {
    a = JSQEXBasicStructure.JSQEX_Wall.JSQEX_create(a, b);
    return JSQEXBasicStructure.JSQEX_CWall.JSQEX_create(a, c)
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_assignContent = function( content ) {

    var room = this.JSQEX_getParentRoom();
    if ( !room ) return;
    if (content.furnSet && ( content.furnSet !== "door" || content.furnSet !== "window" ) ) {
        if (content.myParent !== room.ID ) return;
    }
    else if ((content.graphID !== room.ID) && (content.myParent !== room.ID) ) return;
    var oldWall = content.ebParam && content.ebParam.wall ? content.ebParam.wall.JSQEX_cowall : ( content.wall ? content.wall.JSQEX_cowall : null );
    if ( !oldWall ) oldWall = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[ content.attachID ];
    if ( !oldWall ) return;

    if ( oldWall.ID !== this.ID ) {

        if ( content.isAttPlane ) {
            delete oldWall.JSQEX_edge.JSQEX_embedFurns[ content.id ];
            this.JSQEX_edge.JSQEX_embedFurns[ content.id ] = content;

        }
        else if ( content.furnSet ) {
            oldWall.JSQEX_removeFurn( content );
            this.JSQEX_addFurn( content );
        }
        else if ( content.isHole ) {
            oldWall.JSQEX_removeHole( content );
            this.JSQEX_addHole( content );
        }
    }
    content.JSQEX_onEntityDirty();

};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_getParentRoom = function() {
    var a = this.JSQEX_parents[Object.keys(this.JSQEX_parents)[0]];
    if (a instanceof JSQEXBasicStructure.JSQEX_Room)
        return a
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_copyProperty = function(a) {
    a && (this.JSQEX_width = a.JSQEX_width,
        this.JSQEX_height3d = a.JSQEX_height3d,
        //this.wallType = a.wallType,
        this.JSQEX_isBear = a.JSQEX_isBear,

        this.JSQEX_edge.JSQEX_heightEditable = a.JSQEX_edge.JSQEX_heightEditable,
        this.JSQEX_hided = a.JSQEX_hided,
        this.JSQEX_pattern = copyObj( a.JSQEX_pattern ),
        a.JSQEX_moldings.forEach(function(a, c) {
            0 !== a.size && a.forEach(function(a) {
                a = a.JSQEX_clone();
                this.JSQEX_addMolding(c, a)
            }, this)
        }, this)

    )
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_getWallMesh = function( type ) {
    if ( this.JSQEX_WallMesh3D ) {
        return this.JSQEX_WallMesh3D.JSQEX_WallPlanes[type];
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_canSetPartial = function() {
    var furnGroup = this.JSQEX_edge.JSQEX_embedFurns;
    var ret = true;
    if ( Object.keys( this.JSQEX_edge.JSQEX_OpenHoles).length ) return false;
    Object.keys( furnGroup).forEach(function(furn) {
        if ( furnGroup[ furn ].furnSet == "door" || furnGroup[ furn ].furnSet == "window" ) ret = false;
    });
    return ret;
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_addFurn = function( furn ) {
    this.JSQEX_edge.JSQEX_embedFurns[ furn.id ] = furn;
    var doorOrWindow = furn.furnSet == "door" || furn.furnSet == "window";
    if ( doorOrWindow ) {
        furn.JSQEX_inRoomPos = JSQEXMathematics.JSQEX_projectOnWall( this.JSQEX_From, this.JSQEX_To, furn.position, this.JSQEX_width / 2 + 0.01 );
        this.JSQEX_onEntityDirty();
    }

    if ( this.JSQEX_partner && doorOrWindow ) {
        //this.JSQEX_onEntityDirty();
        this.JSQEX_partner.JSQEX_edge.JSQEX_embedFurns[ furn.id ] = furn;
        if ( doorOrWindow ) this.JSQEX_partner.JSQEX_onEntityDirty();
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_removeFurn = function( furn ) {
    var doorOrWindow = furn.furnSet == "door" || furn.furnSet == "window";
    delete this.JSQEX_edge.JSQEX_embedFurns[ furn.id ];
    delete furn.JSQEX_inRoomPos;
    if ( this.JSQEX_WallMesh3D ) delete this.JSQEX_WallMesh3D.JSQEX_holeList[ furn.id ];
    if ( doorOrWindow ) this.JSQEX_onEntityDirty();

    if ( this.JSQEX_partner && doorOrWindow ) {
        delete this.JSQEX_partner.JSQEX_edge.JSQEX_embedFurns[ furn.id ];
        if ( this.JSQEX_partner.JSQEX_WallMesh3D ) delete this.JSQEX_partner.JSQEX_WallMesh3D.JSQEX_holeList[ furn.id ];
        if ( doorOrWindow ) this.JSQEX_partner.JSQEX_onEntityDirty();
    }
};



JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_dispose = function( clearCache ) {
    this.JSQEX_moldings.forEach(function(d, e) {
        0 !== d.size && (
            d.forEach(function(d, g) {
                this.JSQEX_removeMolding( e, g );

            }, this))
    }, this);
    if ( this.JSQEX_WallMesh instanceof THREE.Mesh ) {
        var borGeo = this.JSQEX_WallMesh.JSQEX_borderMesh.geometry;
        var edgeGeo = this.JSQEX_WallMesh.geometry;
        borGeo.dispose();
        edgeGeo.dispose();
        this.JSQEX_WallMesh.material.dispose();
        this.JSQEX_WallMesh.JSQEX_borderMesh.material.dispose();
        Engine.mainInterface.Scene2D.remove( this.JSQEX_WallMesh );
        Engine.mainInterface.Scene2D.remove( this.JSQEX_WallMesh.JSQEX_borderMesh );
    }

    if ( this.JSQEX_WallMesh3D ) this.JSQEX_WallMesh3D.JSQEX_dispose();
    this.JSQEX_WallMesh = null;
    this.JSQEX_removed = true;
    this.JSQEX_deleteLabel();
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_deleteLabel = function() {
    //var mf = Engine.mainInterface;
    if ( this.labels instanceof Array ) {
        for ( var i = 0; i < this.labels.length; i++ ) {
            var lines = this.labels[i];
//            lines.remove( lines.labelPlane );
//            mf.Scene2D.remove( lines );
//            var h5text = lines.h5Text;
//            lines.geometry.dispose();
//            lines.labelPlane.geometry.dispose();
//            lines.labelPlane.material.map.dispose();
//            lines.labelPlane.material.dispose();
//            delete lines.labelPlane;
//            //lines.material.dispose();
//            mf.cssScene.remove(h5text);
//            delete lines.h5Text;
            JSQEX_deleteSingleLabel( lines );
            this.labels[i] = null;
            //console.log( "delete labels" )
        }
        delete this.labels;
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_getLabelPoints = function() {
    var geo = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry( this );
    var geo1 = JSQEXBasicStructure.JSQEX_Wall.JSQEX_unshelveredWallGeometry(this);
    if ( !geo1 ) {
        var res = [];
        res.JSQEX_direction = new THREE.Vector3();
        return res;
    }
    var sp, ep;
    var osp, oep;
    sp = geo1[0];
    ep = geo1[1];
    osp = geo1[2];
    oep = geo1[3];

    var startPoint1 = JSQEXMathematics.JSQEX_projectOnWall(osp, oep, sp, 0);
    var endPoint1 = JSQEXMathematics.JSQEX_projectOnWall(sp, ep, sp, 0);
    var dir = new THREE.Vector3( startPoint1.x - endPoint1.x, 0, startPoint1.z - endPoint1.z );
    if ( geo && geo.JSQEX_geometry && geo.JSQEX_indices ) {
        var endPoint, startPoint;

        sp = geo.JSQEX_geometry[geo.JSQEX_indices[0]];
        ep = geo.JSQEX_geometry[geo.JSQEX_indices[1]];

        if (Engine.mainInterface.labelMode == "middle") {
            startPoint = JSQEXMathematics.JSQEX_projectOnWall(sp, ep, this.JSQEX_From, 2);
            endPoint = JSQEXMathematics.JSQEX_projectOnWall(sp, ep, this.JSQEX_To, 2);
            res = [startPoint, endPoint];
            res.JSQEX_direction = dir;
            return res;
        }
        else {
            var osp1 = geo.JSQEX_geometry[geo.JSQEX_indices[3]];
            var oep1 = geo.JSQEX_geometry[geo.JSQEX_indices[2]];
            var line = new JSQEXMathematics.JSQEX_Line( osp1.x, osp1.y, oep1.x, oep1.y );
            var lerp1 = line.JSQEX_getClosestLinearInterpolation_(sp.x, sp.y);
            var lerp2 = line.JSQEX_getClosestLinearInterpolation_(ep.x, ep.y);
            var desp = ( lerp1 >= 0 && lerp1 <= 1 ) ? sp : osp1;
            var deep = ( lerp2 >= 0 && lerp2 <= 1 ) ? ep : oep1;
            startPoint = JSQEXMathematics.JSQEX_projectOnWall(sp, ep, desp, 0);
            endPoint = JSQEXMathematics.JSQEX_projectOnWall(sp, ep, deep, 0);
            res = [startPoint, endPoint, startPoint1, endPoint1];
            res.JSQEX_direction = dir;
            return res;
        }


    }
    else {
        res = [];
        res.JSQEX_direction = dir;
        return res;
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_genLabel = function( geo, pair, isTextArea ) {
    var sp, ep;
    var endPoint, startPoint;
    var mf = Engine.mainInterface;


    this.JSQEX_deleteLabel();

    if ( !customGlobalVar.labelVisible || this.JSQEX_removed ) return;
    if ( THREE.Vector2.JSQEX_difference( this.JSQEX_From, this.JSQEX_To).length() < 10 ) return;

    geo = geo ? geo : Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry( this );
    if ( geo && geo.JSQEX_geometry && geo.JSQEX_indices ) {
        sp = geo.JSQEX_geometry[ geo.JSQEX_indices[0] ];
        ep = geo.JSQEX_geometry[ geo.JSQEX_indices[1] ];

        if ( Engine.mainInterface.labelMode == "middle" ) {
            startPoint = JSQEXMathematics.JSQEX_projectOnWall( sp, ep, this.JSQEX_From, 2 );
            endPoint = JSQEXMathematics.JSQEX_projectOnWall( sp, ep, this.JSQEX_To, 2 );
        }
        else {
            startPoint = JSQEXMathematics.JSQEX_projectOnWall( sp, ep, sp, 2 );
            endPoint = JSQEXMathematics.JSQEX_projectOnWall( sp, ep, ep, 2 );
        }

        var pl = [startPoint];
        if ( pair ) {
            pl.push( JSQEXMathematics.JSQEX_projectOnWall( startPoint, endPoint, pair[0], 0 ),
                JSQEXMathematics.JSQEX_projectOnWall( startPoint, endPoint, pair[1], 0 ));
        }

        pl.push( endPoint );
        var labels = [];
        var labelIDEnum = ['L', 'M', 'R'];
        for ( var i = 0; i < pl.length - 1; i++ ) {
            var label;
            if ( pl.length == 2 )
                label = JSQEX_createSingleLabel( pl[i], pl[i + 1], isTextArea );
            else {
                if ( labelIDEnum[i] !== 'M' ) label = JSQEX_createSingleLabel( pl[i], pl[i + 1], isTextArea + labelIDEnum[i] );
                else label = null;
                //else label = JSQEX_createSingleLabel( pl[i], pl[i + 1] );
            }

            if ( label ) {
                mf.Scene2D.add( label );
                labels.push( label );
            }
        }

        if ( isTextArea ) this.JSQEX_isTextArea = true;
        else {
            delete this.JSQEX_isTextArea;
        }
        this.labels = labels;
    }

};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_draw = function( clearCache, updateMat, ignoreHole ) {
    if ( clearCache ) {
        Engine.mainInterface.JSQEX_GeoManager.JSQEX_clearGeometryCache( this.ID );
        //this._JSQEX_boundDirty = true;
    }

    if ( !( this.JSQEX_WallMesh instanceof THREE.Mesh ) ) {
        var GeoInfo = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry( this );
        if ( GeoInfo && GeoInfo.JSQEX_geometry && GeoInfo.JSQEX_indices ) {
            var points = GeoInfo.JSQEX_geometry;
            var borderPoints = convert2DTo3DPoints( points );
            var edgePoints = getPointsByOffset( borderPoints, GeoInfo.JSQEX_indices, 0.1 );
            var borderGeo = new THREE.Geometry();

            for ( var i = 0; i < GeoInfo.JSQEX_indices.length; i++ ) {
                borderGeo.vertices[ i ] = borderPoints[GeoInfo.JSQEX_indices[ i ]];
            }
            var edgeGeo = createPolyGeo( edgePoints, JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_MaxWallPointsNum );
            if ( edgeGeo ) {
                if (this.JSQEX_edge.JSQEX_heightEditable)
                    this.JSQEX_WallMesh = new THREE.Mesh(edgeGeo, new THREE.MeshBasicMaterial({ color: JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_EditableEdgeColor, opacity: customGlobalVar.opacity2D }));
                else if (this.JSQEX_isBear) this.JSQEX_WallMesh = new THREE.Mesh(edgeGeo, new THREE.MeshBasicMaterial({ color: JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_BearEdgeColor, opacity: customGlobalVar.opacity2D }));
                else this.JSQEX_WallMesh = new THREE.Mesh(edgeGeo, new THREE.MeshBasicMaterial({ color: JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_EdgeColor, opacity: customGlobalVar.opacity2D }));

                this.JSQEX_WallMesh.JSQEX_borderMesh = new THREE.Line(borderGeo, new THREE.LineBasicMaterial({ color: JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_BorderColor }), THREE.LinePieces);
                this.JSQEX_WallMesh.JSQEX_borderMesh.position.y = -0.05;
                this.JSQEX_WallMesh.add(this.JSQEX_WallMesh.JSQEX_borderMesh);
                this.JSQEX_WallMesh.position.y = 0.1;

            }
        }
        if ( !Engine.mainInterface.JSQEX_expertLabel || this.labels ) this.JSQEX_genLabel( GeoInfo );
    }
    else {

        borderGeo = this.JSQEX_WallMesh.JSQEX_borderMesh.geometry;
        edgeGeo = this.JSQEX_WallMesh.geometry;
        GeoInfo = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(this);
        if ( GeoInfo && GeoInfo.JSQEX_geometry ) {
            points = GeoInfo.JSQEX_geometry;
            borderPoints = convert2DTo3DPoints(points);
            edgePoints = getPointsByOffset(borderPoints, GeoInfo.JSQEX_indices, 0.1);
            borderGeo.vertices = [];
            for (i = 0; i < GeoInfo.JSQEX_indices.length; i++) {
                borderGeo.vertices[ i ] = borderPoints[GeoInfo.JSQEX_indices[ i ]];
            }
            createPolyGeo(edgePoints, JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_MaxWallPointsNum, edgeGeo);
            borderGeo.verticesNeedUpdate = true;
            edgeGeo.verticesNeedUpdate = true;
        }
        if ( !Engine.mainInterface.JSQEX_expertLabel || this.labels ) this.JSQEX_genLabel( GeoInfo );
    }


    if ( this.JSQEX_WallMesh ) {
        this.JSQEX_WallMesh.visible = !this.JSQEX_hided;
        if ( this.JSQEX_WallMesh instanceof THREE.Mesh ) {
//            if (!this.JSQEX_partner) this.JSQEX_WallMesh.material.color.setRGB(Math.random(), Math.random(), Math.random());
//            else {
//                var color = this.JSQEX_partner.JSQEX_WallMesh instanceof THREE.Mesh ? this.JSQEX_partner.JSQEX_WallMesh.material.color : new THREE.Color(0, 0, 0);
//                this.JSQEX_WallMesh.material.color.setRGB(color.r, color.g, color.b);
//            }
            this.JSQEX_WallMesh.JSQEX_entity = this;
            this.JSQEX_WallMesh.isEdge = true;

            if (!this.JSQEX_WallMesh3D)
                this.JSQEX_WallMesh3D = new JSQEXUtilities.JSQEX_WallGeometryEditor(this);

            this.JSQEX_WallMesh3D.JSQEX_createMesh(updateMat, ignoreHole);
            Engine.mainInterface.Scene2D.add(this.JSQEX_WallMesh);
        }
    }
    else {
        this.JSQEX_WallMesh = new THREE.Object3D();
        this.JSQEX_WallMesh.JSQEX_entity = this;
        this.JSQEX_WallMesh.isEdge = true;
        if ( !this.JSQEX_WallMesh3D )
            this.JSQEX_WallMesh3D = new JSQEXUtilities.JSQEX_WallGeometryEditor( this );

    }

    var wallEnum = JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum;
    var moldEnum = JSQEXBasicStructure.JSQEX_MoldingTypeEnum;
    var mold = this.JSQEX_getMolding( wallEnum.JSQEX_inner, moldEnum.JSQEX_Cornice );
    if ( mold ) mold.JSQEX_draw();
    mold = this.JSQEX_getMolding( wallEnum.JSQEX_outer, moldEnum.JSQEX_Cornice );
    if ( mold ) mold.JSQEX_draw();
    mold = this.JSQEX_getMolding( wallEnum.JSQEX_inner, moldEnum.JSQEX_Baseboard );
    if ( mold ) mold.JSQEX_draw();
    mold = this.JSQEX_getMolding( wallEnum.JSQEX_outer, moldEnum.JSQEX_Baseboard );
    if ( mold ) mold.JSQEX_draw();

    if ( !updateMat ) JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_waitToUpdate, {} );
    this._JSQEX_boundDirty = false;
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_insertWallAtPoint = function(a, b) {
    var c = this
        , d = function(a, b) {
            var d = [], e;
            for (e in a.JSQEX_parents)
                d.push(a.JSQEX_parents[e]);
            d.forEach(function(d) {
         
                d !== c && d !== c.JSQEX_prev && d !== c.JSQEX_next && (d.JSQEX_From === a ? d.JSQEX_From = b : d.JSQEX_To === a && (d.JSQEX_To = b))
            })
        }
        , e = function(a, c) {
            if (a) {
                var e = JSQEXBasicStructure.JSQEX_CWall.JSQEX_create(c, b);
                e.reversed = a.reversed;
                var f = JSQEXMathematics.JSQEX_isSamePoint(a.JSQEX_From, e.JSQEX_From, 1E-6)
                    , g = JSQEXMathematics.JSQEX_isSamePoint(a.JSQEX_To, e.JSQEX_To, 1E-6);
                if (f || g) {
                    var r = a.JSQEX_prev
                        , t = a.JSQEX_next;
                    f ? (e.JSQEX_prev = r,
                        e.JSQEX_next = a,
                        d(a.JSQEX_From, e.JSQEX_To),
                        d(r.JSQEX_To, e.JSQEX_From),
                        a.JSQEX_From = e.JSQEX_To,
                        r.JSQEX_To = e.JSQEX_From) : g && (e.JSQEX_prev = a,
                        e.JSQEX_next = t,
                        d(a.JSQEX_To, e.JSQEX_From),
                        d(t.JSQEX_From, e.JSQEX_To),
                        a.JSQEX_To = e.JSQEX_From,
                        t.JSQEX_From = e.JSQEX_To);
                    (f = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]]) && f.JSQEX_addChild(e);
                    return e
                }
            }
        }
        , f = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a)
        , g = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a)
        , f = JSQEXBasicStructure.JSQEX_Wall.JSQEX_create(f, g);
    e(this, f);
    e(this.JSQEX_partner, f);
    return f
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_dump = function(a, structureOnly) {
    //if ( this.JSQEX_removed ) return [];
    var b = JSQEXBasicStructure.JSQEX_CWall.superClass_.JSQEX_dump.call(this, a, structureOnly)
        , c = b[0];

    c.JSQEX_pattern = this.JSQEX_pattern && !structureOnly ? copyObj( this.JSQEX_pattern ) : {};
    c.JSQEX_moldings = {};
    if ( !structureOnly ) {
        this.JSQEX_moldings.forEach(function (d, e) {
            0 !== d.size && (c.JSQEX_moldings[e] = {},
                d.forEach(function (d, g) {
                    c.JSQEX_moldings[e][g] = d.ID;
                    b = b.concat(d.JSQEX_dump(a))
                }))
        });
    }
    a && a(b, this);
    return b
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_CWall.superClass_.JSQEX_load.call(this, a, b);
    if ( a.JSQEX_pattern ) {
        this.JSQEX_pattern = a.JSQEX_pattern;

    }
    a.JSQEX_moldings && this._JSQEX_loadMoldings(a.JSQEX_moldings, b);
};

JSQEXBasicStructure.JSQEX_CWall.prototype._JSQEX_loadMoldings = function(a, b) {
    for (var c in a) {
        var d = a[c], e;
        for (e in d) {
            var f = d[e];
            f && (f = b.JSQEX_data[f]) && (f = this._JSQEX_loadEntity(f, b)) && (this.JSQEX_getModlingsByFaceType(c).set(e, f),
                f._JSQEX_host = this)
        }
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_getFacetypeByMoldingId = function(a) {
    if (this.JSQEX_moldings) {
        var b = void 0;
        this.JSQEX_forEachMolding(function(c, d) {
            b || a === c.ID && (b = d)
        });
        return b
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_forEachMolding = function(a, b) {
    this.JSQEX_moldings.forEach(function(c, d) {
        c.forEach(function(c, f) {
            a.call(b, c, d)
        })
    })
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_getMolding = function(a, b) {
    return this.JSQEX_getModlingsByFaceType(a).get(b)
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_getModlingsByFaceType = function(a) {
    var b = this.JSQEX_moldings.get(a);
    b || (b = new Map,
        this.JSQEX_moldings.set(a, b));
    return b
}
;
JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_addMolding = function(a, b) {
    this.JSQEX_getModlingsByFaceType(a).set(b.type, b);
    b.JSQEX_assignTo(this);

    b.JSQEX_onEntityDirty();
//    var c = this.JSQEX_getUniqueParent();
//    if ( c && ( c instanceof JSQEXBasicStructure.JSQEX_Room ) )
//        b.JSQEX_doAutoFit();
    //this.JSQEX_onEntityDirty();
}
;
JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_removeMolding = function(a, b) {
    var c = this.JSQEX_getModlingsByFaceType(a)
        , d = c.get(b);
    d && (d.JSQEX_assignTo(null ),
        c.delete(b),
        JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildRemoved, {
            mainObj: d
        }));
    //this.JSQEX_onEntityDirty();
}
;
JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_getMoldingById = function(a) {
    if (this.JSQEX_moldings) {
        var b;
        Array.from(this.JSQEX_moldings.values()).find(function(c) {
            return b = Array.from(c.values()).find(function(b) {
                return b.JSQEX_seekId === a
            })
        });
        return b
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_isAlignsWithOpening = function(a) {
    var b = THREE.Math.degToRad(this.rotation - a.rotation)
        , c = JSQEXMathematics.JSQEX_nearlyEquals(Math.cos(b), 1) && (0 === a.JSQEX_swing || 3 === a.JSQEX_swing);
    a = JSQEXMathematics.JSQEX_nearlyEquals(Math.cos(b), -1) && (1 === a.JSQEX_swing || 2 === a.JSQEX_swing);
    return c || a
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_addHole = function( holeMesh ) {

    var room = this.JSQEX_getParentRoom();
    holeMesh.myParent = room ? room.ID : -1;
    holeMesh.attachID = this.ID;
    //holeMesh.isHole = true;
    this.JSQEX_edge.JSQEX_OpenHoles[holeMesh.id] = holeMesh;
    if ( room ) room.JSQEX_contents[holeMesh.id] = holeMesh;

    this.JSQEX_onEntityDirty();
    if ( this.JSQEX_partner ) {

        this.JSQEX_partner.JSQEX_edge.JSQEX_OpenHoles[ holeMesh.id ] = holeMesh;
        this.JSQEX_partner.JSQEX_onEntityDirty();
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_removeHole = function( holeMesh ) {
    var mf = Engine.mainInterface;
    delete this.JSQEX_edge.JSQEX_OpenHoles[ holeMesh.id ];
    var room = this.JSQEX_getParentRoom();
    if ( room ) delete room.JSQEX_contents[ holeMesh.id ];
    holeMesh.myParent = -1;
    holeMesh.attachID = -1;
    if ( this.JSQEX_WallMesh3D ) delete this.JSQEX_WallMesh3D.JSQEX_holeList[ holeMesh.id ];
    if ( holeMesh.JSQEX_holeMesh ) {
        if ( holeMesh.JSQEX_holeMesh.parent ) holeMesh.JSQEX_holeMesh.parent.remove( holeMesh.JSQEX_holeMesh );
        delete holeMesh.JSQEX_holeMesh.JSQEX_furn;
        holeMesh.JSQEX_holeMesh.geometry.dispose();
        var mats = holeMesh.JSQEX_holeMesh.material.materials;
        var mIndex = holeMesh.JSQEX_holeMesh.mIndexGroup;
        for ( var i = 0; i < mats.length; i++ ) {
            if ( mf.mirrorGroup[mIndex[i]] )
                mf.mirrorGroup[mIndex[i]].deleteMirror();
        }
        delete holeMesh.JSQEX_holeMesh;
    }
    this.JSQEX_onEntityDirty();

    if ( this.JSQEX_partner ) {
        delete this.JSQEX_partner.JSQEX_edge.JSQEX_OpenHoles[ holeMesh.id ];
        if ( this.JSQEX_partner.JSQEX_WallMesh3D ) delete this.JSQEX_partner.JSQEX_WallMesh3D.JSQEX_holeList[ holeMesh.id ];
        this.JSQEX_partner.JSQEX_onEntityDirty();
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_modelSpaceToUVWSpace = function(a) {
    var b = a.x || 0
        , c = a.y || 0;
    a = a.z || 0;
    var d = this.JSQEX_direction.normalize()
    c = (new THREE.Vector2(b,c)).sub(this.JSQEX_From);
    b = THREE.Vector2.JSQEX_dot(c, d);
    d = THREE.Vector2.JSQEX_dot(c, d.rotate(-.5 * Math.PI));
    return {
        u: b,
        v: a,
        w: d
    }
};

JSQEXBasicStructure.JSQEX_CWall.prototype.JSQEX_UVWSpaceToModelSpace = function(a) {
    var b = a.u || 0
        , c = a.v || 0;
    a = a.w || 0;
    var d = this.JSQEX_direction.normalize()
        , b = ( new THREE.Vector2(d.x, d.y) ).scale(b);
    a = ( new THREE.Vector2(d.x, d.y) ).rotate(-.5 * Math.PI).scale(a);
    b = ( new THREE.Vector2(this.JSQEX_From.x, this.JSQEX_From.y) ).add(b).add(a);
    return {
        x: b.x,
        y: b.y,
        z: c
    }
};

JSQEXBasicStructure.JSQEX_Loop = function(a) {
    JSQEXBasicStructure.BasicStructure.call(this, a);
    this.JSQEX_root = null;
};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Loop, JSQEXBasicStructure.BasicStructure);
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Loop";
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_lastEdge = function() {
    var a = this.JSQEX_root;
    this.JSQEX_root && this.JSQEX_root.JSQEX_prev && (a = this.JSQEX_root.JSQEX_prev);
    return a
};
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_lastVertex = function() {
    var a = this.JSQEX_lastEdge();
    return a ? a.JSQEX_To : void 0
};
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_appendEdge = function(a, b) {
    if (!this.JSQEX_root)
        return this.JSQEX_root = a,
            this.JSQEX_root.JSQEX_next = void 0,
            this.JSQEX_root.JSQEX_prev = void 0,
            this.JSQEX_addChild(a),
            a;
    var c = b || this.JSQEX_lastEdge()
        , d = c && c.JSQEX_next ? c.JSQEX_next : this.JSQEX_root;
    a.JSQEX_prev = c;
    a.JSQEX_next = d;
    this.JSQEX_addChild(a);
    return a
};
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_removeEdge = function(a, b) {
    var c = a.JSQEX_prev
        , d = a.JSQEX_next;
    this.JSQEX_root.ID === a.ID && (this.JSQEX_root = a.JSQEX_next);
    c.JSQEX_next = d;
    this.JSQEX_removeChild(a.ID, b);
    a.JSQEX_prev = void 0;
    a.JSQEX_next = void 0;
    return a
};
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_removeChild = function(a, b) {
    var c = JSQEXBasicStructure.JSQEX_Loop.superClass_.JSQEX_removeChild.call(this, a, b);
    if (c && c instanceof JSQEXBasicStructure.JSQEX_CEdge) {
        var d = c.JSQEX_partner;
        d && (c.JSQEX_edge.JSQEX_CoEdge = d,
            c.JSQEX_partner.JSQEX_partner = void 0,
            c.JSQEX_partner = void 0,
            d.JSQEX_updateConnectedEdges());
        c.JSQEX_prev = void 0;
        c.JSQEX_next = void 0
    }
    return c
};
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_onFieldChanged = function(a, b, c) {
    JSQEXUtilities.JSQEX_dispatchEvent(JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_FieldChanged,{
        mainObj: this,
        JSQEX_fieldName: a,
        JSQEX_oldValue: b,
        JSQEX_newValue: c
    })
};
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_onEntityDirty = function() {
    JSQEXBasicStructure.JSQEX_Loop.superClass_.JSQEX_onEntityDirty.call(this);
    
};
JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_dump = function(a, structureOnly) {
    //if ( this.JSQEX_removed ) return [];
    var b = JSQEXBasicStructure.JSQEX_Loop.superClass_.JSQEX_dump.call(this, a, structureOnly);
    b[0].JSQEX_root = this.JSQEX_root ? this.JSQEX_root.ID : void 0;
    var c = this.JSQEX_root;
    do
        c && (b = b.concat(c.JSQEX_dump(a, structureOnly)),
            c = c.JSQEX_next);
    while (c && c.ID !== this.JSQEX_root.ID);
    return b
};

JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_Loop.superClass_.JSQEX_load.call(this, a, b);
    this.JSQEX_root = this._JSQEX_loadEntity(b.JSQEX_data[a.JSQEX_root], b)
};

JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_toPolygon = function() {
    if (this.JSQEX_root) {
        var a = [this.JSQEX_root.JSQEX_From], b = this.JSQEX_root;
        do
            a.push(b.JSQEX_To),
                b = b.JSQEX_next;
        while (b && b.ID !== this.JSQEX_root.ID);
        return 4 > a.length || a[0].ID !== a[a.length - 1].ID ? void 0 : a
    }
};

JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_toPolygon1 = function() {
    if (this.JSQEX_root) {
        var a = [{ x: this.JSQEX_root.JSQEX_From.x, y: this.JSQEX_root.JSQEX_From.y }]
            , b = this.JSQEX_root.JSQEX_next;


        while (b && b.ID !== this.JSQEX_root.ID) {
            a.push({ x: b.JSQEX_From.x, y: b.JSQEX_From.y }),
                b = b.JSQEX_next;
        };
        return 4 > a.length ? void 0 : a
    }
};

JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_getMassProps = function() {
    var a = this.JSQEX_toPolygon();
    return a ? JSQEXMathematics.JSQEX_getMassProperties(a) : [0, 0, 0]
};

JSQEXBasicStructure.JSQEX_Loop.prototype.JSQEX_invert = function() {
    for (var a = [this.JSQEX_root], b = this.JSQEX_root.JSQEX_next; b && b.ID !== this.JSQEX_root.ID; )
        a.push(b),
            b = b.JSQEX_next;
    for (var c = 0; c < a.length; c++) {
        var d = a[c]
            , b = a[(c + 1) % a.length];
        d.JSQEX_prev = b;
        b.JSQEX_next = d;
        d.JSQEX_reversed = !d.JSQEX_reversed
    }
};

JSQEXBasicStructure.JSQEX_Room = function(a) {
    JSQEXBasicStructure.JSQEX_Loop.call(this, a);
    this.JSQEX_innerWalls = [];
    this.JSQEX_roomType = { name: "无房间类型", id: 0, alias: "无房间类型", label: "未定义" };
    this.JSQEX_roomHeight = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_WallDefaultHeight;
    this.JSQEX_surf = null;
    this.JSQEX_groundPattern = null;
    this.JSQEX_groundBorder = null;
    this.JSQEX_ceilPattern = null;
    this.JSQEX_ceilBorder = null;
    this.JSQEX_areas = [];
    this.JSQEX_contents = {};
    this.JSQEX_rooms = {};
    this.JSQEX_graph = null;
    this.JSQEX_planks = {};
    this.JSQEX_platforms = {};
    this.JSQEX_hardwares = {};
};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Room, JSQEXBasicStructure.JSQEX_Loop);
JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Room";
JSQEXBasicStructure.JSQEX_Room.JSQEX_create = function() {
    return new JSQEXBasicStructure.JSQEX_Room()
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_onFieldChanged = function(a, b, c) {
    JSQEXBasicStructure.JSQEX_Room.superClass_.JSQEX_onFieldChanged.call(this, a, b, c);

};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_onEntityDirty = function() {
    JSQEXBasicStructure.JSQEX_Room.superClass_.JSQEX_onEntityDirty.call(this);
    this.JSQEX_ruleRoom();
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_addChild = function(a, b) {
    if ( a instanceof JSQEXBasicStructure.JSQEX_CEdge || a instanceof JSQEXBasicStructure.JSQEX_Room ) {
        var c = JSQEXBasicStructure.JSQEX_Room.superClass_.JSQEX_addChild.call(this, a, b);
            if (c)
                return c instanceof JSQEXBasicStructure.JSQEX_Room && (this.JSQEX_rooms[c.ID] = c),
                    c
    }

}
;
JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_removeChild = function(a, b) {
    a instanceof JSQEXBasicStructure.JSQEX_CWall && console.log( "remove wall" );
    var c = JSQEXBasicStructure.JSQEX_Room.superClass_.JSQEX_removeChild.call(this, a, b);
    c && c instanceof JSQEXBasicStructure.JSQEX_Room && delete this.JSQEX_rooms[c.ID];
    return c
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_buildRoomFromPointList = function(a) {
    var b = a.length;

    for (var c = new JSQEXBasicStructure.JSQEX_Room, d = 0; d < b - 1; ++d) {
        var e = JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints(a[d], a[d + 1]);
        c.JSQEX_appendEdge(e)
    }
    c.JSQEX_validate();
    return c
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_buildRoomFromWallList = function(a) {
    for (var b = new JSQEXBasicStructure.JSQEX_Room, c = 0, d = a.length; c < d; ++c)
        b.JSQEX_appendEdge(JSQEXBasicStructure.JSQEX_CWall.JSQEX_create(a[c]));
    b.JSQEX_validate();
    return b
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_Room.superClass_.JSQEX_load.call(this, a, b);
    var c = this.JSQEX_root;
    this.JSQEX_areas = a.JSQEX_areas ? a.JSQEX_areas : [];
    if (a.JSQEX_polyLines) {
        for ( var i = 0; i < a.JSQEX_areas.length; i++ ) {
            if ( a.JSQEX_polyLines[i] ) {
                this.JSQEX_areas[i].polyline = a.JSQEX_polyLines[i]
            }
        }
    }
    this.JSQEX_groundPattern = a.JSQEX_groundPattern;
    this.JSQEX_groundBorder = a.JSQEX_groundBorder;
    this.JSQEX_roomType = a.JSQEX_roomType;
    this.JSQEX_roomHeight = a.JSQEX_roomHeight;
    this.JSQEX_ceilPattern = a.JSQEX_ceilPattern;
    this.JSQEX_ceilBorder = a.JSQEX_ceilBorder;
    this.JSQEX_ceilDatas = a.JSQEX_ceilDatas;
    this.JSQEX_wallBoard = a.JSQEX_wallBoard;
    //var pos = this.JSQEX_getMassProps();

    if ( a.JSQEX_label ) {
        this.JSQEX_label = a.JSQEX_label;
    }

    if (a.JSQEX_planks ) {
        for ( i = 0; i < a.JSQEX_planks.length; i++ ) {
            if ( a.JSQEX_planks[i] ) {
                var plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(a.JSQEX_planks[i]);
                this.JSQEX_addPlank(plank, true);
            }
        }
    }

    if (a.JSQEX_hardwares) {
        for ( i = 0; i < a.JSQEX_hardwares.length; i++ ) {
            for ( var j = 0; j < a.JSQEX_hardwares[i].length; j++ ) {
                if ( a.JSQEX_hardwares[i][j].JSQEX_wallID !== -1 ) {
                    var hardware = JSQEXBasicStructure.BasicStructure.JSQEX_Load(a.JSQEX_hardwares[i][j]);
                    this.JSQEX_addHardware(hardware, a.JSQEX_hardwares[i][j].JSQEX_wallID, true);
                    hardware.JSQEX_onEntityDirty();
                }
            }
        }
    }

    if (a.JSQEX_platforms ) {
        for ( i = 0; i < a.JSQEX_platforms.length; i++ ) {
            if ( a.JSQEX_platforms[i] ) {
                plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(a.JSQEX_platforms[i]);
                this.JSQEX_addPlatform(plank, true);
            }
        }
    }
    this.JSQEX_validate()
};



JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_dump = function(a, structureOnly) {
    //if ( this.JSQEX_removed ) return [];
    var b = JSQEXBasicStructure.JSQEX_Room.superClass_.JSQEX_dump.call(this, a, structureOnly);
    var c = b[0];
    c.JSQEX_groundPattern = this.JSQEX_groundPattern && !structureOnly ? copyObj( this.JSQEX_groundPattern ) : null;
    c.JSQEX_groundBorder = this.JSQEX_groundBorder && !structureOnly ? copyObj( this.JSQEX_groundBorder ) : null;
    c.JSQEX_roomType = this.JSQEX_roomType;
    c.JSQEX_ceilPattern = this.JSQEX_ceilPattern && !structureOnly ? copyObj( this.JSQEX_ceilPattern ) : null;
    c.JSQEX_ceilBorder = this.JSQEX_ceilBorder && !structureOnly ? copyObj( this.JSQEX_ceilBorder ) : null;
    c.JSQEX_roomHeight = this.JSQEX_roomHeight;
    c.JSQEX_areas = this.JSQEX_areas;
    var graph = this.JSQEX_graph;

    if ( this.JSQEX_label )
        c.JSQEX_label = this.JSQEX_label;

    if ( c.JSQEX_areas instanceof Array ) {
        c.JSQEX_polyLines = [];
        for ( var i = 0; i < c.JSQEX_areas.length; i++ ) {
            c.JSQEX_polyLines.push( c.JSQEX_areas[i].polyline )
        }
    }
    if ( !structureOnly ) {

        var sTool = new SuspendedCeilingTool();
        if ( graph ) {
            if ( graph.ceilLayers ) c.JSQEX_ceilDatas = sTool.getCeilData(graph);
            c.JSQEX_wallBoard = sTool.getWallBoardData(graph);
        }
    }

    var d;
    for (d in this.JSQEX_contents)
        b = b.concat(this.JSQEX_contents[d].JSQEX_dump(a, structureOnly));
    if ( !structureOnly ) {
        c.JSQEX_planks = [];
        Object.keys( this.JSQEX_planks).forEach( function( id ) {
            c.JSQEX_planks.push( this.JSQEX_planks[id].JSQEX_dump(a)[0] );
        }, this );
        c.JSQEX_platforms = [];
        Object.keys( this.JSQEX_platforms).forEach( function( id ) {
            c.JSQEX_platforms.push( this.JSQEX_platforms[id].JSQEX_dump(a)[0] );
        }, this );
        c.JSQEX_hardwares = [];
        var scope = this;
        Object.keys( this.JSQEX_hardwares).forEach( function( id ) {
            c.JSQEX_hardwares.push([]);
            Object.keys( scope.JSQEX_hardwares[id] ).forEach( function( id1 ) {
                c.JSQEX_hardwares[c.JSQEX_hardwares.length - 1].push( scope.JSQEX_hardwares[id][id1].JSQEX_dump(a)[0] );
            } )
        } );
    }
    return b
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_getPlankData = function() {
    var planks = {};
    Object.keys( this.JSQEX_planks).forEach( function( id ) {
        planks[id] = this.JSQEX_planks[id].JSQEX_dump()[0];
    }, this );

    return planks;
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_getPlatformData = function() {
    var planks = {};
    Object.keys( this.JSQEX_platforms).forEach( function( id ) {
        planks[id] = this.JSQEX_platforms[id].JSQEX_dump()[0];
    }, this );

    return planks;
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_getHardwareData = function(wallID) {
    var hardwares = {};
    var scope = this;
    if ( !wallID ) {
        Object.keys(this.JSQEX_hardwares).forEach(function (id) {
            hardwares[id] = {};
            Object.keys(scope.JSQEX_hardwares[id]).forEach(function (id1) {
                hardwares[id][id1] = scope.JSQEX_hardwares[id][id1].JSQEX_dump()[0];
            })
        });
    }
    else {
        if ( this.JSQEX_hardwares[ wallID ] ) {
            Object.keys(this.JSQEX_hardwares[ wallID ]).forEach(function (id1) {
                hardwares[id1] = scope.JSQEX_hardwares[wallID][id1].JSQEX_dump()[0];
            })
        }
    }
    return hardwares;
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_ruleRoom = function() {
    var scope = this;
     this.JSQEX_forEachWall( function(cowall) {
         var wall = cowall.JSQEX_edge;
         if ( !wall.JSQEX_heightEditable && wall.JSQEX_height3d > scope.JSQEX_roomHeight ) {
             wall.JSQEX_height3d = scope.JSQEX_roomHeight;
             cowall.JSQEX_onEntityDirty();
         }
     } );
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_move = function(a, b, dntBK) {
    this._JSQEX_boundDirty = !0;

    delete this.JSQEX_label;
    var scope = this;
    function JSQEX_checkBack(x, y) {
        var back = false;
        scope.JSQEX_forEachWall(function(c) {
            c.JSQEX_From.x += x;
            c.JSQEX_From.y += y;
        });
        var geo = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(scope);
        if ( geo && geo.JSQEX_outFloor ) {
            var cps = geo.JSQEX_outFloor;
            Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachRoom(function (room) {
                if (back) return;
                if ( room.ID == scope.ID ) return;
                var rgeo = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(room);

                if (rgeo && rgeo.JSQEX_floor) {
                    var fps = rgeo.JSQEX_floor;
                    back = JSQEXMathematics.JSQEX_isPolygonOverlapped(fps, cps, 0.5, true);
                }

            });
        }

        if ( back ) {
            scope.JSQEX_forEachWall(function(c) {
                c.JSQEX_From.x -= x;
                c.JSQEX_From.y -= y;

            });
            return [0, 0]
        }

        return [ x, y ];
    }


    if ( !dntBK ) {

        var res1 = JSQEX_checkBack(a, 0);
        var res2 = JSQEX_checkBack(0, b);

        a = res1[0], b = res2[1];
    }
    else {
        this.JSQEX_forEachWall(function(c) {
            c.JSQEX_From.x += a;
            c.JSQEX_From.y += b;

        });
    }


    for (var c in this.JSQEX_contents) {
        var d = this.JSQEX_contents[c];
        if ( d ) {
            d.position.x += a;
            d.position.z += b;
            if (d.profile) {
                d.profile.position.x = d.position.x;
                d.profile.position.z = d.position.z;
            }

            if (d.JSQEX_path) {
                for (var i = 0; i < d.JSQEX_path.length; i++) {
                    d.JSQEX_path[i].x += a;
                    d.JSQEX_path[i].z += b;
                }
            }
        }
    }
    for (var e in this.JSQEX_rooms)
        this.JSQEX_rooms[e].JSQEX_move(a, b)
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_addPlank = function( plank, drawLater ) {
    if ( !plank ) {
        console.log( "no plank to add" );
        return;
    }
    this.JSQEX_planks[ plank.ID ] = plank;
    plank.graphID = this.ID;
    if ( this.JSQEX_graph ) {
        plank.JSQEX_container = this.JSQEX_graph;
    }
    else {
        console.log( "no graph for added plank" );
    }


    if ( !drawLater ) {
        plank.JSQEX_draw();
        //JSQEXUtilities.JSQEX_dispatchEvent(JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_StartDrawQueue, {
        //    JSQEX_clearCache: true,
        //    JSQEX_updateMat: true
        //});
    }
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_addPlatform = function( platform, area, drawLater ) {
    if ( !platform || !area ) {
        console.log( "no platform to add" );
        return;
    }

    if ( this.JSQEX_platforms[ platform.ID ] ) {
        console.log( "area has platform, just return" );
        return;
    }
    this.JSQEX_platforms[ platform.ID ] = platform;
    platform.graphID = this.ID;
    area.JSQEX_platformID = platform.ID;
    if ( this.JSQEX_graph ) {
        platform.JSQEX_container = this.JSQEX_graph;
        this.JSQEX_areas = copyArea( this.JSQEX_graph.areas );
    }
    else {
        console.log( "no graph for added plank" );
    }


    if ( !drawLater ) {
        platform.JSQEX_draw();
        //JSQEXUtilities.JSQEX_dispatchEvent(JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_StartDrawQueue, {
        //    JSQEX_clearCache: true,
        //    JSQEX_updateMat: true
        //});
    }
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_removePlatform = function( platform ) {
    if ( !platform ) return;
    delete this.JSQEX_platforms[ platform.ID ];
    if ( this.JSQEX_graph ) this.JSQEX_graph.JSQEX_adjustObjOneFloor();
    platform.JSQEX_container = null;
    platform.graphID = -1;
    JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildRemoved, {
        mainObj: platform
    });
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_removePlank = function( plank ) {
    if ( !plank ) return;
    delete this.JSQEX_planks[ plank.ID ];
    if ( this.JSQEX_graph ) this.JSQEX_graph.JSQEX_adjustObjOneCeil();
    plank.JSQEX_container = null;
    plank.graphID = -1;
    JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildRemoved, {
        mainObj: plank
    });
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_updatePlankData = function( newData, oldData ) {
    var copyNew = copyObj(newData);
    for ( var id in oldData ) {
        if ( oldData.hasOwnProperty(id) ) {
            if (copyNew[id] && !Compare(copyNew[id], oldData[id])) {
                this.JSQEX_removePlank(this.JSQEX_planks[id]);
                var plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(copyNew[id]);
                this.JSQEX_addPlank(plank, true);
                copyNew[id].JSQEX_dealed = true;
            }
            else if (!copyNew[id]) this.JSQEX_removePlank(this.JSQEX_planks[id]);
        }
    }
    for ( id in copyNew ) {
        if ( copyNew.hasOwnProperty(id) ) {
            if (!copyNew[id].JSQEX_dealed) {
                plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(copyNew[id]);
                this.JSQEX_addPlank(plank);
            }
        }
    }
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_updatePlatformData = function( newData, oldData ) {
    var copyNew = copyObj(newData);
    for ( var id in oldData ) {
        if ( oldData.hasOwnProperty(id) ) {
            if (copyNew[id] && !Compare(copyNew[id], oldData[id])) {
                this.JSQEX_removePlatform(this.JSQEX_planks[id]);
                var plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(copyNew[id]);
                this.JSQEX_addPlatform(plank, true);
                copyNew[id].JSQEX_dealed = true;
            }
            else if (!copyNew[id]) this.JSQEX_removePlatform(this.JSQEX_platforms[id]);
        }
    }
    for ( id in copyNew ) {
        if ( copyNew.hasOwnProperty(id) ) {
            if (!copyNew[id].JSQEX_dealed) {
                plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(copyNew[id]);
                this.JSQEX_addPlatform(plank);
            }
        }
    }
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_updateHardwareData = function( wallID, newData, oldData ) {
    var copyNew = copyObj(newData);
    if (!this.JSQEX_hardwares[wallID]) this.JSQEX_hardwares[wallID] = [];
    for ( var id in oldData ) {
        if ( oldData.hasOwnProperty(id) ) {
            if (copyNew[id] && !Compare(copyNew[id], oldData[id])) {
                this.JSQEX_removeHardware(this.JSQEX_hardwares[wallID][id], wallID);
                var plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(copyNew[id]);
                this.JSQEX_addHardware(plank, wallID);
                copyNew[id].JSQEX_dealed = true;
            }
            else if (!copyNew[id]) this.JSQEX_removeHardware(this.JSQEX_hardwares[wallID][id]);
        }
    }
    for ( id in copyNew ) {
        if ( copyNew.hasOwnProperty(id) ) {
            if (!copyNew[id].JSQEX_dealed) {
                plank = JSQEXBasicStructure.BasicStructure.JSQEX_Load(copyNew[id]);
                this.JSQEX_addHardware(plank, wallID);
            }
        }
    }
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_addHardware = function( hardware, wallID, drawLater ) {
    if ( !this.JSQEX_hardwares[wallID] ) this.JSQEX_hardwares[wallID] = {};
    this.JSQEX_hardwares[wallID][hardware.ID] = hardware;
    hardware.graphID = this.ID;
    hardware.wallID = wallID;
    var cowall = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database[wallID];
    if ( this.JSQEX_graph ) {
        hardware.JSQEX_container = this.JSQEX_graph;
        hardware.JSQEX_wall = cowall.JSQEX_WallMesh3D && cowall.JSQEX_WallMesh3D.JSQEX_WallPlanes[JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_inner];
        hardware.JSQEX_cowall = cowall;
    }
    else {
        console.log( "no graph for added plank" );
    }

    if ( !drawLater ) {
        hardware.JSQEX_onEntityDirty();
        JSQEXUtilities.JSQEX_dispatchEvent(JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_StartDrawQueue, {
            JSQEX_clearCache: true,
            JSQEX_updateMat: true
        });
    }
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_removeHardware = function( hardware, wallID ) {
    if ( !this.JSQEX_hardwares[wallID] || !hardware ) return;

    delete this.JSQEX_hardwares[wallID][hardware.ID];
    hardware.JSQEX_container = null;
    hardware.graphID = -1;
    hardware.JSQEX_wall = null;
    hardware.JSQEX_cowall = null;

    JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildRemoved, {
        mainObj: hardware
    });
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_dispose = function() {
    var mf = Engine.mainInterface;
    if ( this.JSQEX_graph ) {
        this.JSQEX_graph.deleteFloor();
        this.JSQEX_graph.deleteCeiling();
        delete mf.task.grapic2D[ this.ID ];

        if ( tool ) tool.removeCeiling(this.JSQEX_graph);

        if ( this.JSQEX_planks ) {
            var ceilCon = this.JSQEX_planks;
            Object.keys( ceilCon).forEach(function( id ) {
                ceilCon[id].JSQEX_dispose();
                ceilCon[id].JSQEX_container = null;
            })
        }
        this.JSQEX_graph = undefined;
    }
    this.JSQEX_removed = true;
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_draw = function(clearCache, updateMat) {
    //var mf = Engine.mainInterface;
    if ( clearCache ) {
        Engine.mainInterface.JSQEX_GeoManager.JSQEX_clearGeometryCache( this.ID );
        //this._JSQEX_boundDirty = true;
    }
    var GeoInfo = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(this);
    if ( !this.JSQEX_graph ) {
        if (GeoInfo && GeoInfo.JSQEX_floor && GeoInfo.JSQEX_floor.length > 2) {
            var pointList = convert2DTo3DPoints( GeoInfo.JSQEX_floor );
            pointList.outList = GeoInfo.JSQEX_outFloor;
            this.JSQEX_graph = new JSQ.Room2DProfile( undefined, Engine, undefined, this );
            //this.JSQEX_areas = this.JSQEX_graph.areas ? copyObj( this.JSQEX_graph.areas ) : [];
            ceilList = convert2DTo3DPoints( GeoInfo.JSQEX_ceiling );
            this.JSQEX_graph.mapPointSites( pointList, ceilList, GeoInfo.JSQEX_outWallGroup, updateMat );
            this.JSQEX_graph.addToScene();

            Engine.mainInterface.task.grapic2D[ this.ID ] = this.JSQEX_graph;
        }
    }
    else {
        if (GeoInfo && GeoInfo.JSQEX_floor && GeoInfo.JSQEX_floor.length > 2) {
            var fm = this.JSQEX_graph.mirrorFloor ? this.JSQEX_graph.mirrorFloor.material : null;
            var cm = this.JSQEX_graph.ceiling ? this.JSQEX_graph.ceiling.material : null;
            this.JSQEX_areas = this.JSQEX_graph.areas ? copyArea( this.JSQEX_graph.areas ) : [];
            //this.JSQEX_graph = new JSQ.Room2DProfile( pointList, Engine, undefined, this );
            if ( !updateMat && !( fm instanceof THREE.MeshBasicMaterial )) {
                this.JSQEX_groundPattern = fm ? copyObj(fm.template.pattern) : null;
                this.JSQEX_groundBorder = fm ? copyObj(fm.template.borderGroup) : null;
            }

            if ( !updateMat && !( cm instanceof THREE.MeshBasicMaterial )) {
                this.JSQEX_ceilPattern = cm ? copyObj(cm.template.pattern) : null;
                this.JSQEX_ceilBorder = cm ? copyObj(cm.template.borderGroup) : null;
            }

            this.JSQEX_graph.deleteFloor();
            this.JSQEX_graph.deleteCeiling();
            var oldPointList = this.JSQEX_graph.pointList.concat();
            pointList = convert2DTo3DPoints( GeoInfo.JSQEX_floor );
            var ceilList = convert2DTo3DPoints( GeoInfo.JSQEX_ceiling );
            pointList.outList = GeoInfo.JSQEX_outFloor;
            this.JSQEX_graph.mapPointSites( pointList, ceilList, GeoInfo.JSQEX_outWallGroup, updateMat, oldPointList );



            //Engine.mainInterface.task.grapic2D[ this.ID ] = this.JSQEX_graph;
        }
    }
    var ceilTool = new SuspendedCeilingTool();
    if ( this.JSQEX_ceilDatas && this.JSQEX_graph ) {

        ceilTool.showCeilLayer( this.JSQEX_graph, this.JSQEX_ceilDatas );
        if (this.JSQEX_graph.ceilLayers && this.JSQEX_graph.ceilLayers[0] )
            ceilTool.refershMaterial( this.JSQEX_graph.ceilLayers[0].ceils[0] );
        delete this.JSQEX_ceilDatas;
    }

    if ( this.JSQEX_wallBoard && this.JSQEX_graph ) {
        ceilTool.showWallBoard(this.JSQEX_graph, this.JSQEX_wallBoard);
        delete this.JSQEX_wallBoard;
    }

    if ( !updateMat ) JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_waitToUpdate, {} );
    this._JSQEX_boundDirty = false;
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_setHeight3d = function(a) {

    this.JSQEX_forEachWall(function(b) {
        b.JSQEX_height3d = a
    })
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_getHeight3d = function() {
    if ( !this.JSQEX_root.JSQEX_edge.JSQEX_heightEditable ) return this.JSQEX_root.JSQEX_height3d;
    for (var c = this.JSQEX_root, d = c.JSQEX_next; d.ID !== c.ID; d = d.JSQEX_next ) {
        if ( !d.JSQEX_edge.JSQEX_heightEditable ) return d.JSQEX_height3d;
    }

    return 0;
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_getBuildingWalls = function() {
    var a = []
        , b = this.JSQEX_root;
    do
        b && (a.push(b),
            b = b.JSQEX_next);
    while (b && b.ID !== this.JSQEX_root.ID);return a
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_collisionDetect = function(a, outer) {
    var list1, list2;
    if ( !outer ) {
        list1 = a.JSQEX_toPolygon();
        list2 = this.JSQEX_toPolygon();

    }
    else {
        list1 = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(this).JSQEX_outFloor;
        list2 = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(a).JSQEX_outFloor;

    }

    return checkOverLaped(list1, list2);
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_collisionDetect1 = function(a, epsilon) {
    var list1, list2;

    list1 = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(this).JSQEX_outFloor;
    list2 = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry(a).JSQEX_floor;

    return JSQEXMathematics.JSQEX_isPolygonOverlapped(list1, list2, epsilon ? epsilon : 0.5, true);
};

//JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_collisionDetect = function() {
//    var a = void 0
//        , b = void 0
//        , c = new JSQEXBasicStructure.JSQEX_Bound(Infinity,Infinity,0,0)
//        , d = new JSQEXBasicStructure.JSQEX_Bound(Infinity,Infinity,0,0);
//    return function(e, f) {
//        var g = f || 0;
//        if (!a || e._JSQEX_boundDirty) {
//            a = e.JSQEX_toPolygon();
//            if (!a)
//                return !1;
//            c.JSQEX_reset();
//            a.forEach(function(a) {
//                c.JSQEX_appendPoint(a)
//            })
//        }
//        if (!b || this._JSQEX_boundDirty) {
//            b = this.JSQEX_toPolygon();
//            if (!b)
//                return !1;
//            d.JSQEX_reset();
//            b.forEach(function(a) {
//                d.JSQEX_appendPoint(a)
//            })
//        }
//        var h = !1;
//        c.JSQEX_isValid() && d.JSQEX_isValid() && (h = JSQEXUtilities.JSQEX_Collision_AABBIntersect(c, d, g));
//        return h
//    }
//}();

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_snapTo = function(a) {
    var b = {
            x: NaN,
            y: NaN
        }

        , c = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_WallDefaultWidth;
    this.JSQEX_forEachWall(function(d) {
        a.JSQEX_forEachWall(function(a) {
            if (!(d.length < 2 * c || a.length < 2 * c) && JSQEXMathematics.JSQEX_isParallel(d.JSQEX_From, d.JSQEX_To, a.JSQEX_From, a.JSQEX_To, .2) && JSQEXMathematics.JSQEX_isPointInLine(d.JSQEX_From, a.JSQEX_From, a.JSQEX_To, c)) {
                var f = JSQEXMathematics.JSQEX_getPerpendicularIntersect(d.JSQEX_From, a.JSQEX_From, a.JSQEX_To);
                a = f.x - d.JSQEX_From.x;
                f = f.y - d.JSQEX_From.y;
                b.x = isNaN(b.x) ? a : Math.abs(b.x) < Math.abs(a) ? a : b.x;
                b.y = isNaN(b.y) ? f : Math.abs(b.y) < Math.abs(f) ? f : b.y
            }
        })
    });

    return isNaN(b.x) ? void 0 : b
}
;

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_forEachContent = function(a, b) {
    Object.keys(this.JSQEX_contents).forEach(function(c) {
        a.call(b, this.JSQEX_contents[c])
    }, this);
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_eliminateOverlappedWalls = function() {
    var a = this
        , b = function(b) {
            var c = !1, d = a.JSQEX_root;
            if ( !d ) return;
            do {
                if (b !== d && JSQEXMathematics.JSQEX_isSegmentsOverlapped(d.JSQEX_From, d.JSQEX_To, b.JSQEX_From, b.JSQEX_To, .01)) {
                    c = !0;
                    break
                }
                d = d.JSQEX_next
            } while (d && d !== a.JSQEX_root);return c
        }
        , c = function() {
            var c = []
                , d = []
                , g = a.JSQEX_root;
            do {
                if (!b(g))
                    break;
                g = g.JSQEX_prev
            } while (g !== a.JSQEX_root);var h = g;
            do
                b(g) ? d.push(g) : 0 < d.length && (c.push(d),
                    d = []),
                    g = g.JSQEX_next;
            while (g && g !== h);0 < d.length && c.push(d);
            return c
        }();
    if (0 !== c.length) {
        var d = [];
        c.forEach(function(b) {
            for (var c = void 0, g = void 0,
                     h = b[0].JSQEX_From, m = 1; m < b.length; m++) {
                var n = b[m];
                JSQEXMathematics.JSQEX_isPointInLineSegment(h, n.JSQEX_From, n.JSQEX_To, .01) && (g = n)
            }
            h = b[b.length - 1].JSQEX_To;
            for (m = b.length - 2; 0 <= m; m--)
                n = b[m],
                    JSQEXMathematics.JSQEX_isPointInLineSegment(h, n.JSQEX_From, n.JSQEX_To, .01) && (c = n);
            c ? g = b[b.length - 1] : g && (c = b[0]);
            if (c && g) {
                b = c;
                for (c = b.JSQEX_next; c !== g; )
                    n = c.JSQEX_next,
                        a.JSQEX_removeEdge(c),
                        d.push(c),
                        c = n;
                a.JSQEX_removeEdge(b);
                a.JSQEX_removeEdge(g);
                d.push(b);
                d.push(g)
            }
        });
        this.JSQEX_healLoop(d);
        this.JSQEX_eliminateSmallWalls()
    }
}
;
JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_eliminateSmallWalls = function() { //消除小于规定长度的墙
    if (this.JSQEX_root && this.JSQEX_root.JSQEX_next) {
        var a = this.JSQEX_root
            , b = a;
        do {
            if (4 > this.JSQEX_getBuildingWalls().length)
                break;
            var c = b.JSQEX_next;
            var rootRemoved = false;
            if ( .01 > b.length ) {
                JSQEXBasicStructure.JSQEX_Site_replace(b.JSQEX_next.JSQEX_From, b.JSQEX_prev.JSQEX_To); //如果墙的长度小于0.01，就被过滤删除，并把两侧的墙收尾连接起来
                this.JSQEX_removeEdge(b);
                if ( a === b ) {
                    rootRemoved = true;   //如果根被干掉了，需要替换a,不然循环立即终止了
                    a = c;
                }

            }
            b = rootRemoved ? ( c ? c.JSQEX_next : undefined ) : c

        } while (b && b !== a)
    }
}
;
JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_healLoop = function(a) {
    if (this.JSQEX_root && this.JSQEX_root.JSQEX_next) {
        var b = function(b, c) {
                return a ? a.find(function(a) {
                    return JSQEXMathematics.JSQEX_isPointInLineSegment(b, a.JSQEX_From, a.JSQEX_To) && JSQEXMathematics.JSQEX_isPointInLineSegment(c, a.JSQEX_From, a.JSQEX_To)
                }) : void 0
            }
            , c = this.JSQEX_root;
        do {
            var d = c.JSQEX_next;
            if (d.JSQEX_From !== c.JSQEX_To) {
                var e = b(d.JSQEX_From, c.JSQEX_To) || c
                    , e = JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints(c.JSQEX_To, d.JSQEX_From, e);
                e.JSQEX_prev = c;
                e.JSQEX_next = d;
                this.JSQEX_addChild(e)
            }
            c = d
        } while (c && c !== this.JSQEX_root)
    }
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_validate = function() {
    if ( !this.JSQEX_root ) return;
    this.JSQEX_healLoop();
    this.JSQEX_eliminateSmallWalls();
    var a = this.JSQEX_getMassProps();
    a && 0 > a[0] && this.JSQEX_invert(); //顺时针排列房间结点，
    this.JSQEX_eliminateOverlappedWalls()
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_eliminateCommonWalls = function() {
    var a = [];
    this.JSQEX_forEachWall(function(b) {
        a.includes(b.JSQEX_edge) || a.push(b.JSQEX_edge)
    });
    a.forEach(function(a) {
        a.JSQEX_eliminateCommonWalls();
        a.JSQEX_tryMerge()
    });
    this.JSQEX_validate()
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_getConnectedRooms = function() {
    var a = [];
    this.JSQEX_forEachWall(function(b) {
        b.JSQEX_partner && (b = b.JSQEX_partner.JSQEX_parents[Object.keys(b.JSQEX_partner.JSQEX_parents)[0]],

            b === this || a.includes(b) || a.push(b))
    }, this);
    return a
}
;
JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_detach = function() {
    var a = []
        , b = [];
    this.JSQEX_forEachWall(function(b) {
        b.JSQEX_partner && a.push(b)
    });
    a.forEach(function(a) {
        var c = a.JSQEX_next
            , d = a.JSQEX_prev
            , h = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a.JSQEX_From)
            , m = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a.JSQEX_To)
            , h = JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints(h, m, a);
        this.JSQEX_removeEdge(a, true);
        h.JSQEX_prev = d;
        h.JSQEX_next = c;
        this.JSQEX_addChild(h);
        b.push(h)
    }, this);
    var c = this.JSQEX_root;
    do {
        var d = c.JSQEX_next;
        d.JSQEX_From !== c.JSQEX_To && (b.includes(c) ? d.JSQEX_From = c.JSQEX_To : b.includes(d) && (c.JSQEX_To = d.JSQEX_From));
        c = d
    } while (c !== this.JSQEX_root);this.JSQEX_forEachWall(function(a) {
        var b =
            a.JSQEX_From, c = [], d;
        for (d in b.JSQEX_parents)
            c.push(b.JSQEX_parents[d]);
        2 >= c.length || (c = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(b),
            a.JSQEX_removeChild(b.ID),
            a.JSQEX_From = c,
            a.JSQEX_addChild(c),

            a.JSQEX_prev && (a.JSQEX_prev.JSQEX_removeChild(b.ID),
            a.JSQEX_prev.JSQEX_To = c,
            a.JSQEX_prev.JSQEX_addChild(c)))
    })
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_tryMergeWalls = function() {
    var a = [];
    this.JSQEX_forEachWall(function(b) {
        a.includes(b.JSQEX_edge) || a.push(b.JSQEX_edge)
    });
    a.forEach(function(a) {
        a.JSQEX_tryMerge()
    })
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_getRoomPoints = function() {
    var a = [];
    this.JSQEX_forEachWall(function(b) {
        a.push(b.JSQEX_From)
    });
    return a
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_forEachWall = function(a, b) {
    for (var c = this.JSQEX_root, d = c; d && (a.call(b, d),
        !(d = d.JSQEX_next) || d.ID !== c.ID); );
};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_onEntityDirty = function() {
    JSQEXBasicStructure.JSQEX_Room.superClass_.JSQEX_onEntityDirty.call(this);
    if ( this.JSQEX_graph ) {
        this.JSQEX_graph.enableWallUV();
    }
};

//JSQEXBasicStructure.JSQEX_Room.prototype.forEachContent = function(a, b) {
//    Object.keys(this.contents).forEach(function(c) {
//        a.call(b, this.contents[c])
//    }, this)
//};

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_adjustRoomWall = function() {

    this.JSQEX_forEachWall( function( wall ) {
        var cmd = new JSQEXCommands.JSQEX_CmdMoveWall(wall, true);
        cmd.JSQEX_onExecute();
        cmd.JSQEX_move(0, 0);

        //var event = { button: 0, JSQEX_noRecord: true };
        //cmd.JSQEX_mouseUp(event);
    }, this );
};

JSQEXUtilities.JSQEX_RoomSplitter = function(a) {
    this._JSQEX_createdWalls = [];
    this._JSQEX_currentWall = a;
    this._JSQEX_breakOnPoints = []
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_setSplitterWall = function(a) {
    this._JSQEX_currentWall = a;
    this._JSQEX_breakOnPoints = []
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_addBreakPoint = function(a, b, c) {
    if (a && b && b.JSQEX_edge !== this._JSQEX_currentWall.JSQEX_edge) {
        for (var d = 0; d < this._JSQEX_breakOnPoints.length; d++) {
            var e = this._JSQEX_breakOnPoints[d];
            if (e.JSQEX_pickedWall && e.JSQEX_pickedWall.JSQEX_edge === b.JSQEX_edge)
                return
        }
        this._JSQEX_breakOnPoints.push({
            JSQEX_point: a,
            JSQEX_pickedWall: b,
            JSQEX_pickedPoint: c
        })
    }
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_breakWallOnPoint = function(a, b) {
    if (a !== b.JSQEX_From && a !== b.JSQEX_To)
        if (JSQEXMathematics.JSQEX_isPointInLineSegment(a, b.JSQEX_From, b.JSQEX_To))
            b.JSQEX_edge.JSQEX_splitByPoint(a);
        else {
            var c = JSQEXMathematics.JSQEX_pointLength(a, b.JSQEX_From)
                , d = JSQEXMathematics.JSQEX_pointLength(a, b.JSQEX_To)
                , c = JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints(a, c < d ? b.JSQEX_From : b.JSQEX_To);
            Engine.mainInterface.JSQEX_structureInfos.JSQEX_addChild(c)
        }
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype._JSQEX_breakIntersectedWalls = function() {
    if (this._JSQEX_currentWall) {
        var a = this._JSQEX_currentWall
            , b = function(b) {
                var c = void 0
                    , f = void 0;
                JSQEXBasicStructure.JSQEX_Site_getPointOwner(b).JSQEX_walls.forEach(function(b) {
                    var d = JSQEXMathematics.JSQEX_lineLineAngle(a.JSQEX_From, a.JSQEX_To, b.JSQEX_From, b.JSQEX_To);
                    .01 > d || !(void 0 === c || c > d) || (c = d,
                        f = b)
                });
                return f
            }
            , c = [];
        this._JSQEX_breakOnPoints.forEach(function(d) {
            var e = d.JSQEX_point
                , f = d.JSQEX_pickedWall;
            d = d.JSQEX_pickedPoint;
            if (e) {
                var g = f;
                d && (g = b(d) || g);
                JSQEXMathematics.JSQEX_isParallel(a.JSQEX_From, a.JSQEX_To, g.JSQEX_From, g.JSQEX_To) || (g = JSQEXMathematics.JSQEX_lineLineIntersection(a.JSQEX_From,
                    a.JSQEX_To, g.JSQEX_From, g.JSQEX_To),
                    e.x = g.x,
                    e.y = g.y);
                d ? 1 === Object.keys(d.JSQEX_parents).length ? (d.x = e.x,
                    d.y = e.y) : (d = JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints(d, e),
                    g = this._JSQEX_createdWalls.indexOf(a) - 1,
                    this._JSQEX_createdWalls.splice(g, 0, d),
                    Engine.mainInterface.JSQEX_structureInfos.JSQEX_addChild(d)) : (c.push(e),
                    this.JSQEX_breakWallOnPoint(e, f));
                JSQEXMathematics.JSQEX_isSamePoint(e, f.JSQEX_From) ? e === this._JSQEX_currentWall.JSQEX_From ? this._JSQEX_currentWall.JSQEX_From = f.JSQEX_From : e === this._JSQEX_currentWall.JSQEX_To && (this._JSQEX_currentWall.JSQEX_To = f.JSQEX_From) : JSQEXMathematics.JSQEX_isSamePoint(e, f.JSQEX_To) && (e === this._JSQEX_currentWall.JSQEX_From ? this._JSQEX_currentWall.JSQEX_From =
                    f.JSQEX_To : e === this._JSQEX_currentWall.JSQEX_To && (this._JSQEX_currentWall.JSQEX_To = f.JSQEX_To))
            }
        }, this);
        this._JSQEX_currentWall.JSQEX_edge.JSQEX_splitByPoints(c).forEach(function(a) {
            (a = a.JSQEX_getValidCoEdge()) && this._JSQEX_createdWalls.push(a)
        }, this)
    }
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype._JSQEX_addIntersectedPoints = function() {
    this._JSQEX_currentWall && Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachWall(function(a) {
        if (a !== this._JSQEX_currentWall && a !== this.JSQEX_getPrevWall() && a.JSQEX_isValid()) {
            var b = void 0;
            if (JSQEXMathematics.JSQEX_isSamePoint(a.JSQEX_From, this._JSQEX_currentWall.JSQEX_From) || JSQEXMathematics.JSQEX_isSamePoint(a.JSQEX_To, this._JSQEX_currentWall.JSQEX_From))
                b = this._JSQEX_currentWall.JSQEX_From;
            else if (JSQEXMathematics.JSQEX_isSamePoint(a.JSQEX_From, this._JSQEX_currentWall.JSQEX_To) || JSQEXMathematics.JSQEX_isSamePoint(a.JSQEX_To, this._JSQEX_currentWall.JSQEX_To))
                b = this._JSQEX_currentWall.JSQEX_To;
            if (!b) {
                var c = JSQEXMathematics.JSQEX_segmentSegmentIntersection(this._JSQEX_currentWall.JSQEX_From, this._JSQEX_currentWall.JSQEX_To, a.JSQEX_From, a.JSQEX_To);
                c && (b = JSQEXMathematics.JSQEX_isSamePoint(c, this._JSQEX_currentWall.JSQEX_From) ?
                    this._JSQEX_currentWall.JSQEX_From : JSQEXMathematics.JSQEX_isSamePoint(c, this._JSQEX_currentWall.JSQEX_To) ?
                    this._JSQEX_currentWall.JSQEX_To : JSQEXBasicStructure.JSQEX_Site.JSQEX_create(c))
            }
            b && this.JSQEX_addBreakPoint(b, a, void 0)
        }
    }, this)
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_getLastWall = function() {
    return this._JSQEX_createdWalls && 0 < this._JSQEX_createdWalls.length ? this._JSQEX_createdWalls[this._JSQEX_createdWalls.length - 1] : this._JSQEX_currentWall
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_getPrevWall = function() {
    return 1 < this._JSQEX_createdWalls.length ? this._JSQEX_createdWalls[this._JSQEX_createdWalls.length - 2] : this._JSQEX_currentWall
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_pushNewCreated = function(a) {
    a && this._JSQEX_createdWalls.push(a)
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_findLoops = function() {
    var a = this._JSQEX_currentWall.JSQEX_From
        , b = this._JSQEX_currentWall.JSQEX_To;
    0 < this._JSQEX_createdWalls.length && (b = this._JSQEX_createdWalls[this._JSQEX_createdWalls.length - 1].JSQEX_To);
    var c = [a, b];
    this._JSQEX_breakOnPoints.forEach(function(a) {
        var b;
        a: {
            b = c;
            for (var d = a.JSQEX_point, e = 0; e < b.length; e++)
                if (JSQEXMathematics.JSQEX_isSamePoint(d, b[e])) {
                    b = !0;
                    break a
                }
            b = !1
        }
        b || c.push(a.JSQEX_point)
    }, this);
    var d = {};
    c.forEach(function(a) {
        d[a.ID] = JSQEXBasicStructure.JSQEX_Site_getPointOwner(a)
    }, this);
    var e = this
        , c = c.sort(function(a, b) {
            var c = JSQEXMathematics.JSQEX_getLerpNumber(e._JSQEX_currentWall.JSQEX_From,
                    e._JSQEX_currentWall.JSQEX_To, a)
                , d = JSQEXMathematics.JSQEX_getLerpNumber(e._JSQEX_currentWall.JSQEX_From, e._JSQEX_currentWall.JSQEX_To, b);
            return c - d
        });
    return JSQEXUtilities.JSQEX_RoomSplitter._JSQEX_findAllLoops(c, d)
}
;
JSQEXUtilities.JSQEX_RoomSplitter.prototype.JSQEX_execute = function() {
    this._JSQEX_addIntersectedPoints();
    this._JSQEX_breakIntersectedWalls();
    var a = this.JSQEX_findLoops();
    if (JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRoomByLoops(a)) {
        var a = void 0
            , b = this._JSQEX_createdWalls.length;
        0 < b && (b = this._JSQEX_createdWalls[b - 1],
            b.JSQEX_getParentRoom() || (a = b));
        this._JSQEX_createdWalls = [];
        a && this._JSQEX_createdWalls.push(a)
    }
}
;
JSQEXUtilities.JSQEX_RoomSplitter._JSQEX_findAllLoops = function(a, b) {
    var c = [];
    if (2 > a.length)
        return c;
    for (var d, e, f = 0, g = a.length; f < g; f++) {
        e = a[f];
        if (d) {
            var h = JSQEXUtilities.JSQEX_RoomSplitter._JSQEX__findLoop(d, e, !0)
                , m = JSQEXUtilities.JSQEX_RoomSplitter._JSQEX__findLoop(d, e, !1);
            d = h;
            h = m;
            if (d && h) {
                var m = JSQEXMathematics.JSQEX_getMassProperties(d)[0]
                    , n = JSQEXMathematics.JSQEX_getMassProperties(h)[0];
                d = Math.abs(m) < Math.abs(n) ? d : h
            } else
                d = d || h;
            d && c.push(d)
        }
        d = e
    }
    return c
}
;
JSQEXUtilities.JSQEX_RoomSplitter._JSQEX__findLoop = function(a, b, c) {
    var d = function(a, b) {
            var d = [];
            JSQEXBasicStructure.JSQEX_Site_getPointOwner(a).JSQEX_walls.forEach(function(a) {
                a.JSQEX_From !== b && a.JSQEX_To !== b && (d.includes(a.JSQEX_edge) || d.push(a.JSQEX_edge))
            });
            if (0 !== d.length) {
                if (1 === d.length) {
                    var e = d[0];
                    return e.JSQEX_From === a ? e.JSQEX_To : e.JSQEX_From
                }
                var f = void 0
                    , g = void 0;
                d.forEach(function(d) {
                    d = d.JSQEX_From === a ? d.JSQEX_To : d.JSQEX_From;
                    if (!(2 > JSQEXBasicStructure.JSQEX_Site_getPointOwner(d).JSQEX_walls.length)) {
                        var e = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(a, b)
                            , h = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(a, d)
                            , e = e - h;
                        0 > e &&
                        (e += 360);
                        if (void 0 === f || (c ? f > e : f < e))
                            f = e,
                                g = d
                    }
                });
                return g
            }
        }
        , e = function(a, b) {
            for (var c = 0, d = b.length; c < d; c++)
                if (JSQEXMathematics.JSQEX_isSamePoint(a, b[c], .01))
                    return !0;
            return !1
        }
        , f = [a, b]
        , g = d(b, a)
        , h = b;
    for (f.push(g); g && g !== a && g !== b; ) {
        var m = d(g, h);
        if (!m || m !== a && e(m, f)) {
            f.length = 0;
            break
        }
        f.push(m);
        h = g;
        g = m
    }
    a = f.length;
    if (2 < a && f[0] === f[a - 1])
        return f
}
;
JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRooms = function(a, b) {
    if (!a || !b || 0 === a.length || 0 === b.length)
        return !1;
    var c = []
        , d = [];
    a.forEach(function(a) {
        var e = a.JSQEX_toPolygon();
        if (e) {
            var f = !1;
            b.forEach(function(a) {
                var b = a.JSQEX_toPolygon();
                !b || JSQEXMathematics.JSQEX_isPolygonInPolygon(e, b) || JSQEXMathematics.JSQEX_isPolygonInPolygon(b, e) || (b = JSQEXUtilities.JSQEX_Collision_ClipPolygon([e], [b], {
                    JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_inter
                }),
                    0 < b.length && (c = c.concat(b),
                    f = !0,
                    d.includes(a) || d.push(a)))
            });
            f && d.push(a)
        }
    });
    if (0 === c.length)
        return !1;
    if (1 === c.length)
        var e = c;
    else
        var e =
                c.slice(0)
            , f = e.pop()
            , e = JSQEXUtilities.JSQEX_Collision_ClipPolygon(e, [f], {
                JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_union
            });
    if (0 === e.length)
        return !1;
    (function(a, b) {
        a.forEach(function(a) {
            var d = a.JSQEX_toPolygon();
            if (d) {
                var e = []
                    , f = !1;
                b.forEach(function(a) {
                    var b = {};
                    JSQEXUtilities.JSQEX_Collision_OutlineIntersect(d, a, b) && (e.push(a),
                        JSQEXMathematics.JSQEX_nearlyEquals(b.overlap, 0, .01) && (f = !0))
                });
                0 !== e.length && (a = JSQEXUtilities.JSQEX_Collision_ClipPolygon([d], b, {
                    JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_diff
                }),
                    0 < a.length && (f && (a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a,
                    -.01),
                    a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a, .01)),
                    c = c.concat(a)))
            }
        })
    })(d, e);
    var c = JSQEXBasicStructure.JSQEX_Room._JSQEX_filterDuplicatedLoops(c)
        , g = JSQEXBasicStructure.JSQEX_Site_getAllRoomPoints()
        , h = function(a) {
            for (var b = 0, c = g.length; b < c; b++) {
                var d = g[b];
                if (JSQEXMathematics.JSQEX_isSamePoint(a, d, .01))
                    return d
            }
        }
        , m = JSQEXBasicStructure.JSQEX_Site_getAllRoomPoints(a)
        , n = function(a, b) {
            for (var c = [], d = JSQEXBasicStructure.JSQEX_Room._JSQEX_retrievePointsInLine(a, b, m), e = 0, f = d.length - 1; e < f; e++)
                c.push(JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints(d[e], d[e + 1]));
            return c
        }
        , p = [];
    c.forEach(function(a) {
        var b = a.slice(0);
        b.push(b[0]);
        b = JSQEXMathematics.JSQEX_getMassProperties(b)[0];
        if (!(Math.abs(b) < JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_RoomMinimumSize)) {
            for (var c = JSQEXBasicStructure.JSQEX_Room.JSQEX_create(), b = [], d = 0, e = a.length; d < e; ++d) {
                var f = a[d]
                    , g = a[(d + 1) % e];
                b[d] || (b[d] = h(f) || JSQEXBasicStructure.JSQEX_Site.JSQEX_create( f ));
                b[(d + 1) % e] || (b[(d + 1) % e] = h(g) || JSQEXBasicStructure.JSQEX_Site.JSQEX_create(g));
                n(b[d], b[(d + 1) % e]).forEach(function(a) {
                    c.JSQEX_appendEdge(a)
                })
            }
            p.push(c)
        }
    });
    JSQEXBasicStructure.JSQEX_Room.JSQEX_tryAssignRoomProperties(d, p);
    var q = Engine.mainInterface;
    d.forEach(function(a) {
        q.JSQEX_structureInfos.JSQEX_removeChild(a.ID)
    });
    p.forEach(function(a) {
        q.JSQEX_structureInfos.JSQEX_addChild(a)
    });
    p.forEach(function(a) {
        a.JSQEX_eliminateCommonWalls()
    });
    return !0
}
;

JSQEXBasicStructure.JSQEX_Room._JSQEX_retrievePointsInLine = function(a, b, c) {
    var d = [a, b]
        , e = 2 * -JSQEXMathematics.JSQEX_defaultTolerance
        , d = d.concat(c.filter(function(c) {
            return JSQEXMathematics.JSQEX_isPointInLineSegment(c, a, b, e)
        }));
    d.sort(function(c, d) {
        var e = JSQEXMathematics.JSQEX_getLerpNumber(a, b, c)
            , m = JSQEXMathematics.JSQEX_getLerpNumber(a, b, d);
        return e - m
    });
    return d
}
;
JSQEXBasicStructure.JSQEX_Room.JSQEX_tryAssignRoomProperties = function(a, b, c) {
    var d = function(b) {
            if (c && a.includes(c))
                return c;
            if (b.JSQEX_toPolygon()) {
                var d = []
                    , e = b.JSQEX_getRoomPoints();
                a.forEach(function(a) {
                    for (var b = !0, c = a.JSQEX_toPolygon(), f = 0; f < e.length; f++)
                        if (!JSQEXMathematics.JSQEX_isPointOnPolygon(e[f], c)) {
                            b = !1;
                            break
                        }
                    b && d.push(a)
                });
                if (0 < d.length)
                    return d[0]
            }
        }
        ;
    b.forEach(function(a) {

        var b = d(a);
        if ( b ) {
            a.JSQEX_groundPattern = b.JSQEX_groundPattern ? copyObj( b.JSQEX_groundPattern ) : null;
            a.JSQEX_groundBorder = b.JSQEX_groundBorder ? copyObj( b.JSQEX_groundBorder ) : null;
            a.JSQEX_ceilPattern = b.JSQEX_ceilPattern ? copyObj( b.JSQEX_ceilPattern ) : null;
            a.JSQEX_ceilBorder = b.JSQEX_ceilBorder ? copyObj( b.JSQEX_ceilBorder ) : null;
            //a.JSQEX_areas = null;
        }
    });
    var e = []
        , f = []
        , g = []
        , h = function(a, b) {
            a.forEach(function(a) {
                a.JSQEX_forEachWall(function(a) {
                    b.push(a)
                })
            })
        };
    h(a, e);
    h(b, f);
    c && h([c], g);
    JSQEXBasicStructure.JSQEX_Room.JSQEX_tryAssignRoomContents(a, b);
    JSQEXBasicStructure.JSQEX_Wall.JSQEX_tryAssignWallContents(e, f);
    JSQEXBasicStructure.JSQEX_Wall.JSQEX_tryAssignWallProperties(e, f, g)
}
;

JSQEXBasicStructure.JSQEX_Room.prototype.JSQEX_assignContent = function( content ) {
    var si = Engine.mainInterface.JSQEX_structureInfos;
    if ( content.furnSet ) {
        if ( content.myParent !== this.ID ) {
            var oldRoom = si.JSQEX_rooms[ content.myParent ];
            delete oldRoom.JSQEX_contents[ content.id ];
            this.JSQEX_contents[ content.id ] = content;
            content.myParent = this.ID;
            content.profile.graphID = this.ID;

        }
    }
    else if ( content.isParquet || content.isAttPlane ) {
        if ( content.graphID !== this.ID ) {
            oldRoom = si.JSQEX_rooms[ content.graphID ];
            delete oldRoom.JSQEX_contents[ content.id ];
            this.JSQEX_contents[ content.id ] = content;
            if ( this.JSQEX_graph ) {
                if ( content.isParquet )
                    this.JSQEX_graph.parquetGroup.push( content );
            }
            content.graphID = this.ID;
        }
    }
    else if ( content.isHole ) {
        if ( content.myParent !== this.ID ) {
            oldRoom = si.JSQEX_rooms[ content.myParent ];
            delete oldRoom.JSQEX_contents[ content.id ];
            this.JSQEX_contents[ content.id ] = content;
            content.myParent = this.ID;
        }
    }
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_tryAssignRoomContents = function(a, b) {
    var c = [];
    a.forEach(function(a) {
        Object.keys( a.JSQEX_contents).forEach(function(b) {
            c.push(a.JSQEX_contents[b])
        })
    });
    c.forEach(function(a) {
        for (var c = 0; c < b.length; c++) {
            var f = b[c]
                , g = f.JSQEX_toPolygon();
            var p = a.JSQEX_inRoomPos ? a.JSQEX_inRoomPos : a.position;
            var pos = new THREE.Vector2(p.x, p.z );

            if (JSQEXMathematics.JSQEX_isPointInPolygon(pos, g)) {
                f.JSQEX_assignContent(a);
                break
            }

        }
        if ( c == b.length ) {
            var curRoom = null;
            if ( a.furnSet == "door" || a.furnSet == "window" ) {

                pos = new THREE.Vector2( a.position.x, a.position.z );
                var fdir = new THREE.Vector3( 0, 0, 1 );
                fdir.applyMatrix4(a.matrixWorld );
                var minDis = 9e9;

                for (var i = 0; i < b.length; i++) {
                    f = b[i];
                    g = f.JSQEX_toPolygon();
                    var cp = JSQEXMathematics.JSQEX_closestPointToPolygon( pos, g );
                    cp = new THREE.Vector3(cp.x - pos.x, 0, cp.y - pos.y);
                    if ( cp.angleTo( fdir ) < Math.PI / 2 ) {
                        var len = cp.length();
                        if ( len < minDis ) {
                            minDis = len;
                            curRoom = f;
                        }
                    }
                }
            }

            if ( curRoom ) curRoom.JSQEX_assignContent(a);
            //else Engine.mainInterface.JSQEX_structureInfos.JSQEX_assignContent(a);
        }
    })
};

JSQEXBasicStructure.JSQEX_Room._JSQEX_filterDuplicatedLoops = function(a) {
    var b = [];
    a.forEach(function(a) {
        for (var d = !1, e = 0; e < b.length; e++)
            if (JSQEXMathematics.JSQEX_isSamePolygon(b[e], a)) {
                d = !0;
                break
            }
        d || b.push(a)
    });
    return b
}
;
JSQEXBasicStructure.JSQEX_Room._JSQEX_filterExistingRoomPolygon = function(a) {
    var b = {
        JSQEX_rooms: [],
        JSQEX_loops: []
    };
    if (!a || 0 === a.length)
        return b;
    var c = [];
    Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachRoom(function(a) {
        var b = a.JSQEX_toPolygon();
        b && c.push({
            JSQEX_room: a,
            JSQEX_loop: b
        })
    });
    a.forEach(function(a) {
        for (var e = !1, f = 0; f < c.length; f++) {
            var g = c[f];
            if (JSQEXMathematics.JSQEX_isSamePolygon(g.JSQEX_loop, a, .01)) {
                e = !0;
                b.JSQEX_rooms.push(g.JSQEX_room);
                break
            }
        }
        e || b.JSQEX_loops.push(a)
    });
    return b
}
;
JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRoomByLoops = function(a) {
    if (!a || 0 === a.length)
        return !1;
    var b = JSQEXBasicStructure.JSQEX_Room._JSQEX_filterDuplicatedLoops(a);
    if (0 === b.length)
        return !1;
    var c = [];
    c.push(b[0]);
    if (1 < b.length)
        for (var d = {
            JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_inter
        }, e = {
            JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_diff
        }, f = 1, g = b.length; f < g; f++) {
            var h = b[f]
                , m = JSQEXUtilities.JSQEX_Collision_ClipPolygon(c, [h], d);
            if (0 === m.length)
                c.push(h);
            else {
                var n = m.slice()
                    , m = JSQEXUtilities.JSQEX_Collision_ClipPolygon(c, [h], e)
                    , c = JSQEXUtilities.JSQEX_Collision_ClipPolygon([h], c, e);
                m.forEach(function(a) {
                    n.push(a)
                });
                c.forEach(function(a) {
                    n.push(a)
                });
                c = n
            }
        }
    c.forEach(function(a) {
        JSQEXMathematics.JSQEX_isSamePoint(a[0], a[a.length - 1]) || a.push(a[0])
    });
    var c = JSQEXBasicStructure.JSQEX_Room._JSQEX_filterDuplicatedLoops(c)
        , p = new Set();
    a.forEach(function(a) {
        a.forEach(function(a) {
            p.add(a)
        })
    });
    var q = [];
    p.forEach(function(a) {
        var b = q.find(function(b) {
            return JSQEXMathematics.JSQEX_isSamePoint(b, a)
        });
        b ? b !== a && JSQEXBasicStructure.JSQEX_Site_replace(a, b) : q.push(a)
    });
    c = JSQEXBasicStructure.JSQEX_Room._JSQEX_toModelPoint(c, q);
    a = JSQEXBasicStructure.JSQEX_Room._JSQEX_filterExistingRoomPolygon(c);
    var r = function() {
            var a = {};
            b.forEach(function(b) {
                b.forEach(function(b) {
                    JSQEXBasicStructure.JSQEX_Site_getPointOwner(b).JSQEX_rooms.forEach(function(b) {
                        a[b.ID] =
                            b
                    })
                })
            });
            var c = [], d;
            for (d in a)
                c.push(a[d]);
            return c
        }()
        , t = a.JSQEX_loops.slice(0);
    a.JSQEX_rooms.forEach(function(a) {
        for (var b = 0, c = r.length; b < c; b++) {
            var d = r[b];
            if (d !== a && JSQEXBasicStructure.JSQEX_Room.JSQEX_isRoomOverlapped(a, d)) {
                (a = a.JSQEX_toPolygon()) && t.push(a);
                break
            }
        }
    });
    var u = []
        , x = Engine.mainInterface
        , y = Object.keys(x.JSQEX_structureInfos.JSQEX_walls).map(function(a) {
            return x.JSQEX_structureInfos.JSQEX_walls[a]
        });
    t.forEach(function(a) {
        a = JSQEXBasicStructure.JSQEX_Room.JSQEX_buildRoomFromPointList(a);
        u.push(a);
        a.JSQEX_eliminateCommonWalls();
        JSQEXBasicStructure.JSQEX_Wall.JSQEX_tryAssignWallContents(y, a.JSQEX_getBuildingWalls());
        JSQEXBasicStructure.JSQEX_Wall.JSQEX_tryAssignWallProperties(y,
            a.JSQEX_getBuildingWalls());
        JSQEXBasicStructure.JSQEX_Room.JSQEX_tryAssignRoomProperties(r, [a]);
        x.JSQEX_structureInfos.JSQEX_addChild(a)
    });
    u.forEach(function(a) {
        JSQEXBasicStructure.JSQEX_Room.JSQEX_cleanUpSmallWallAttached(a)
    });
    return JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRooms(r, u)
}
;
JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRoom = function(a) {
    if (!a)
        return !1;
    var b = [];
    Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachRoom(function(c) {
        c.ID !== a.ID && b.push(c)
    });
    var c = a.JSQEX_toPolygon();
    if (!c)
        return !1;
    var d = !1
        , c = JSQEXUtilities.JSQEX_Collision_SimplifyPolygons([c]);
    1 < c.length ? (c = JSQEXBasicStructure.JSQEX_Room._JSQEX_toModelPoint(c, a.JSQEX_getRoomPoints()),
        c.forEach(function(a) {
            a.push(a[0])
        }),
        d = JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRoomByLoops(c)) : d = JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRooms(b, [a]);
    return d
}
;
JSQEXBasicStructure.JSQEX_Room._JSQEX_toModelPoint = function(a, b) {
    var c = b.slice();
    return a.map(function(a) {
        return a.map(function(a) {
            a: {
                for (var b = 0; b < c.length; b++)
                    if (JSQEXMathematics.JSQEX_isSamePoint(a, c[b])) {
                        a = c[b];
                        break a
                    }
                a = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a);
                c.push(a)
            }
            return a
        })
    })
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_RoomSplitterEx = function() {
    this.JSQEX_splitters = []
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_RoomSplitterEx.prototype.JSQEX_pushSplitWall = function(a) {
    a = new JSQEXUtilities.JSQEX_RoomSplitter(a);
    this.JSQEX_splitters.push(a)
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_RoomSplitterEx.prototype.JSQEX_execute = function() {
    var a = [];
    this.JSQEX_splitters.forEach(function(a) {
        a._JSQEX_addIntersectedPoints();
        a._JSQEX_breakIntersectedWalls()
    });
    this.JSQEX_splitters.forEach(function(b) {
        b = b.JSQEX_findLoops();
        a = a.concat(b)
    });
    JSQEXBasicStructure.JSQEX_Room.JSQEX_splitRoomByLoops(a)
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_findInteriorWallsInRoom = function(a) {
    var b = []
        , c = a.JSQEX_toPolygon();
    if (!c)
        return b;
    Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachWall(function(a) {
        !a.JSQEX_getParentRoom() && JSQEXMathematics.JSQEX_isPointOnPolygon(a.JSQEX_From, c) && JSQEXMathematics.JSQEX_isPointOnPolygon(a.JSQEX_To, c) && b.push(a)
    });
    return b
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_findInteriorWallsConnectedToRoom = function(a, b) {
    var c = a.JSQEX_toPolygon();
    if (!c)
        return [];
    var d = []
        , e = function(f) {
            var g = JSQEXBasicStructure.JSQEX_Site_getPointOwner(f)
                , h = 0 < g.JSQEX_rooms.filter(function(b) {
                    return b !== a
                }).length;
            g.JSQEX_walls.forEach(function(a) {
                if (!d.includes(a) && !a.JSQEX_getParentRoom()) {
                    var g;
                    if (g = h)
                        g = !(JSQEXMathematics.JSQEX_isPointOnPolygon(a.JSQEX_From, c) && JSQEXMathematics.JSQEX_isPointOnPolygon(a.JSQEX_To, c));
                    g || b && !b(a) || (g = a.JSQEX_From === f ? a.JSQEX_To : a.JSQEX_From,
                        d.push(a),
                        e(g))
                }
            })
        }
        ;
    a.JSQEX_getRoomPoints().forEach(function(a) {
        e(a)
    });
    return d
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_cleanUpSmallWallAttached = function(a) {
    if (a) {
        var b = [];
        a.JSQEX_forEachWall(function(a) {
            b.push(a.JSQEX_From)
        });
        var c = Engine.mainInterface;
        b.forEach(function(a) {
            JSQEXBasicStructure.JSQEX_Site_getPointOwner(a).JSQEX_walls.forEach(function(b) {
                var f;
                if (f = !b.JSQEX_getParentRoom())
                    f = !(1 < JSQEXBasicStructure.JSQEX_Site_getPointOwner(b.JSQEX_From === a ? b.JSQEX_To : b.JSQEX_From).JSQEX_walls.length);
                f && b.length <= .5 * b.JSQEX_width + .01 && c.JSQEX_structureInfos.JSQEX_removeChild(b.ID)
            })
        })
    }
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_isRoomOverlapped = function(a, b) {
    if (!a || !b)
        return !1;
    var c = a.JSQEX_toPolygon()
        , d = b.JSQEX_toPolygon();
    return c && d ? 0 < JSQEXUtilities.JSQEX_Collision_ClipPolygon([c], [d], {
        JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_inter
    }).length ? !0 : !1 : !1
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_cleanUpInvalidRooms = function() {
    var a = Engine.mainInterface, b = [], c;
    for (c in a.JSQEX_structureInfos.JSQEX_rooms)
        b.push(a.JSQEX_structureInfos.JSQEX_rooms[c]);
    b.forEach(function(b) {
        var c = b.JSQEX_toPolygon();
        (!c || Math.abs(JSQEXMathematics.JSQEX_getMassProperties(c)[0]) < JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_RoomMinimumSize) && a.JSQEX_structureInfos.JSQEX_removeChild(b.ID)
    })
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_mergeRooms = function(a, b) {
    if (a && b && 0 !== b.length && b.every(function(a) {
        return a
    })) {
        var c = a.JSQEX_toPolygon()
            , d = b.map(function(a) {
                return a.JSQEX_toPolygon()
            });
        if (c && d.every(function(a) {
            return a
        }) && (c = JSQEXUtilities.JSQEX_Collision_ClipPolygon([c], d, {
            JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_union
        }),
            1 === c.length)) {
            var e = function(a, b) {
                    for (var c = 0; c < b.length; c++)
                        if (JSQEXMathematics.JSQEX_isPointInLineSegment(a, b[c], b[(c + 1) % b.length], .01))
                            return !0;
                    return !1
                }
                , f = c[0]
                , g = {}
                , c = [a].concat(b);
            c.forEach(function(a) {
                a.JSQEX_forEachWall(function(a) {
                    if (!(!a.JSQEX_isValid() ||
                        g[a.JSQEX_edge.ID] || e(a.JSQEX_From, f) && e(a.JSQEX_To, f))) {
                        var b = JSQEXBasicStructure.JSQEX_CWall.JSQEX_createFromPoints(a.JSQEX_From, a.JSQEX_To, a);
//                        a.JSQEX_edge.JSQEX_forEachContent(function(a) {
//                            a && a.JSQEX_assignTo(b.JSQEX_edge)
//                        });
                        g[a.JSQEX_edge.ID] = b
                    }
                })
            });
            for (var d = JSQEXBasicStructure.JSQEX_Site_getAllRoomPoints(c), h = f, f = [], m = 0, n = h.length; m < n; m++)
                 var p = JSQEXBasicStructure.JSQEX_Room._JSQEX_retrievePointsInLine(h[m], h[(m + 1) % n], d)
                     , f = f.concat(p.slice(0, p.length - 1));
            var q = JSQEXBasicStructure.JSQEX_Site_getAllRoomPoints()
                , r = [];
            f.forEach(function(a) {
                var b;
                a: {
                    b = 0;
                    for (var c = q.length; b < c; b++) {
                        var d = q[b];
                        if (JSQEXMathematics.JSQEX_isSamePoint(a, d, .01)) {
                            b =
                                d;
                            break a
                        }
                    }
                    b = void 0
                }
                b ? r.push(b) : r.push(JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a))
            });
            r.push(r[0]);
            d = JSQEXBasicStructure.JSQEX_Room.JSQEX_buildRoomFromPointList(r);
            JSQEXBasicStructure.JSQEX_Room.JSQEX_tryAssignRoomProperties(c, [d], a);
            var t = Engine.mainInterface;
            c.forEach(function(a) {
                t.JSQEX_structureInfos.JSQEX_removeChild(a.ID)
            });
            t.JSQEX_structureInfos.JSQEX_addChild(d);
            d.JSQEX_eliminateCommonWalls();
            d.JSQEX_getConnectedRooms().forEach(function(a) {
                a.JSQEX_eliminateCommonWalls()
            });
            for (var u in g)
                t.JSQEX_structureInfos.JSQEX_addChild(g[u]);
            return d
        }
    }
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_breakRoom = function(a) {
    if (a) {
        var b = Engine.mainInterface;
        a.JSQEX_forEachWall(function(a) {
            a.JSQEX_isValid() && !a.JSQEX_edge.JSQEX_isShared() && b.JSQEX_structureInfos.JSQEX_addChild(a, !1)
        });
        b.JSQEX_structureInfos.JSQEX_removeChild(a.ID);

    }
};

JSQEXBasicStructure.JSQEX_Room.JSQEX_getRoomContentIn = function(a) {
    var b = Engine.mainInterface, c;
    for (c in b.JSQEX_structureInfos.JSQEX_rooms) {
        var d = b.JSQEX_structureInfos.JSQEX_rooms[c]
            , e = d.JSQEX_toPolygon();
        if (e && JSQEXMathematics.JSQEX_isPointInPolygon(a, e))
            return d
    }
};



/**
 * Created by JSQ on 2016/6/2.
 */

JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum = {
    JSQEX_inner: "JSQEX_inner",
    JSQEX_outer: "JSQEX_outer",
    JSQEX_top: "JSQEX_top",
    JSQEX_bottom: "JSQEX_bottom",
    JSQEX_From: "JSQEX_from",
    JSQEX_To: "JSQEX_to",
    JSQEX_outerfrom: "JSQEX_outerfrom",
    JSQEX_outerto: "JSQEX_outerto"
};

JSQEXBasicStructure.JSQEX_MoldingTypeEnum = {
    JSQEX_Baseboard: "JSQEX_baseboard",
    JSQEX_Cornice: "JSQEX_cornice"
};

JSQEXBasicStructure.JSQEX_Wall.JSQEX_unshelveredWallGeometry = function(a) {
    var b = a.JSQEX_direction
        , c = a.JSQEX_width;
    if (0 > c || JSQEXMathematics.JSQEX_isZero(c)) {}

    else if (b) {
        if (!isNaN(b.x) && 0 !== THREE.Vector2.JSQEX_dot(b, b)) {
            var d = b.normalize().scale(c / 2)
                , b = THREE.Vector2.JSQEX_rotateAroundPoint(d.clone().add(a.JSQEX_From), a.JSQEX_From, Math.PI / 2)
                , c = THREE.Vector2.JSQEX_rotateAroundPoint(d.clone().add(a.JSQEX_To), a.JSQEX_To, Math.PI / 2)
                , e = THREE.Vector2.JSQEX_rotateAroundPoint(d.clone().add(a.JSQEX_To), a.JSQEX_To, -Math.PI / 2);
            a = THREE.Vector2.JSQEX_rotateAroundPoint(d.clone().add(a.JSQEX_From), a.JSQEX_From,
                    -Math.PI / 2);
            a = [b, c, e, a];

            return a
        }
    } else
    {}
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_detach = function(a) {
    var b = a.JSQEX_getConnectedEdges();
    if (1 < JSQEXBasicStructure.JSQEX_Site_getPointOwner(a.JSQEX_From).JSQEX_walls.length) {
        var c = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a.JSQEX_From);
        a.JSQEX_From = c
    }
    1 < JSQEXBasicStructure.JSQEX_Site_getPointOwner(a.JSQEX_To).JSQEX_walls.length && (c = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(a.JSQEX_To),
        a.JSQEX_To = c);
    a.JSQEX_prev = void 0;
    a.JSQEX_next = void 0;
    b.forEach(function(a) {
        a.JSQEX_onEntityDirty();
        a.JSQEX_getParentRoom() ? a.JSQEX_edge.JSQEX_tryMerge() : JSQEXBasicStructure.JSQEX_Wall.JSQEX_mergeWall(a)
    })
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_detachFromRooms = function() {
    var a = function(a, c, d) {
            var e = JSQEXBasicStructure.JSQEX_Site_getPointOwner(a)
                , f = e.JSQEX_rooms
                , f = f.filter(function(a) {
                    return d.includes(a)
                });
            0 !== f.length && e.JSQEX_walls.forEach(function(e) {
                var f = e.JSQEX_getParentRoom();
                f && d.includes(f) && (e.JSQEX_From === a ? e.JSQEX_From = c : e.JSQEX_To === a && (e.JSQEX_To = c))
            })
        }
        ;
    return function(b, c) {
        if (b.JSQEX_isValid()) {
            var d = b.JSQEX_getConnectedEdges()
                , e = [];
            if (0 < JSQEXBasicStructure.JSQEX_Site_getPointOwner(b.JSQEX_From).JSQEX_rooms.filter(function(a) {
                if (!c || c.includes(a))
                    return !0;
                e.push(a);
                return !1
            }).length) {
                var f = b.JSQEX_From
                    , g = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(b.JSQEX_From);
                b.JSQEX_From = g;
                b.JSQEX_prev = void 0;
                a(f, g, e)
            }
            f = JSQEXBasicStructure.JSQEX_Site_getPointOwner(b.JSQEX_To);
            e = [];
            0 < f.JSQEX_rooms.filter(function(a) {
                if (!c || c.includes(a))
                    return !0;
                e.push(a);
                return !1
            }).length && (f = b.JSQEX_To,
                g = JSQEXBasicStructure.JSQEX_Site.JSQEX_create(b.JSQEX_To),
                b.JSQEX_To = g,
                b.JSQEX_next = void 0,
                a(f, g, e));
            d.forEach(function(a) {
                a.JSQEX_onEntityDirty();
                a.JSQEX_getParentRoom() ? a.JSQEX_edge.JSQEX_tryMerge() : JSQEXBasicStructure.JSQEX_Wall.JSQEX_mergeWall(a)
            })
        }
    }
}();
JSQEXBasicStructure.JSQEX_Wall.JSQEX_mergeWall = function(a) {
    if (a.JSQEX_isValid()) {
        for (var b = [], c = function(a, b) {
                var c = JSQEXBasicStructure.JSQEX_Site_getPointOwner(a).JSQEX_walls.filter(function(a) {
                    return a.JSQEX_edge !== b.JSQEX_edge && a.JSQEX_isValid()
                });
                if (1 === c.length)
                    return c[0]
            }
                 , d = a.JSQEX_From, e = a.JSQEX_To, f = a.JSQEX_From, g = a, h = a; g; )
            if (g = c(f, g),
                void 0 != g && JSQEXMathematics.JSQEX_isSamePoint(g.JSQEX_From, g.JSQEX_To))
                b.unshift(g),
                    d = f = g.JSQEX_From === f ? g.JSQEX_To : g.JSQEX_From;
            else if (void 0 != g && JSQEXMathematics.JSQEX_isSameLine(h.JSQEX_From, h.JSQEX_To, g.JSQEX_From, g.JSQEX_To))
                b.unshift(g),
                    d = f = g.JSQEX_From === f ? g.JSQEX_To : g.JSQEX_From,
                    h = g;
            else
                break;
        f = a.JSQEX_To;
        for (h = g = a; g; )
            if (g = c(f,
                g),
                void 0 != g && JSQEXMathematics.JSQEX_isSamePoint(g.JSQEX_From, g.JSQEX_To))
                b.push(g),
                    e = f = g.JSQEX_From === f ? g.JSQEX_To : g.JSQEX_From;
            else if (void 0 != g && JSQEXMathematics.JSQEX_isSameLine(h.JSQEX_From, h.JSQEX_To, g.JSQEX_From, g.JSQEX_To))
                b.push(g),
                    e = f = g.JSQEX_From === f ? g.JSQEX_To : g.JSQEX_From,
                    h = g;
            else
                break;
        var c = 0;
        for (f = b.length; c < f; c++)
            if (b[c].JSQEX_getParentRoom())
                return;
        b.forEach(function(a) {
            Engine.mainInterface.JSQEX_structureInfos.JSQEX_removeChild(a.ID);
            a.JSQEX_prev = void 0;
            a.JSQEX_next = void 0
        });
        a.JSQEX_From = d;
        a.JSQEX_To = e
    }
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_tryAssignWallProperties = function(a, b, c) {
    a && b && 0 !== a.length && 0 !== b.length && b.forEach(function(b) {
        var e;
        a: {
            e = [];
            for (var f = 0, g = a.length; f < g; f++) {
                var h = a[f];
                JSQEXMathematics.JSQEX_isSegmentsOverlapped(b.JSQEX_From, b.JSQEX_To, h.JSQEX_From, h.JSQEX_To) && e.push(h)
            }
            for (var m, h = Number.MAX_VALUE, f = 0, g = e.length; f < g; f++) {
                var n = e[f];
                if (c && c.includes(n)) {
                    e = n;
                    break a
                }
                var p = Math.abs(n.length - b.length);
                if (void 0 === m || p < h)
                    h = p,
                        m = n
            }
            e = m
        }
        b.JSQEX_copyProperty(e)
    })
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_findAllOtherWallsInThisRoom = function(a, b) {
    var c = [];
    if (!(a instanceof JSQEXBasicStructure.JSQEX_CWall))
        return c;
    for (var d = a.JSQEX_next; d && d.ID !== a.ID; )
        c.push(d),
            d = d.JSQEX_next;
    return c
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_cleanUpSmallWalls = function() {
    var a = Engine.mainInterface
        , b = [];
    a.JSQEX_structureInfos.JSQEX_forEachWall(function(a) {
        !a.JSQEX_getParentRoom() && a.length < a.JSQEX_width / 2 + .01 && b.push(a)
    });
    b.forEach(function(b) {
        a.JSQEX_structureInfos.JSQEX_removeChild(b.ID)
    })
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_autoFitToWall = function(a, b) {
//    if (a && a instanceof JSQEXBasicStructure.JSQEX_CoWall) {
//        var c = {
//                x: 0,
//                y: -1
//            }
//            , d = void 0
//            , d = JSQEXMathematics.JSQEX_getPerpendicularIntersect(b, a.JSQEX_To, a.JSQEX_From);
//        b instanceof JSQEXBasicStructure.JSQEX_Opening ? (b.x = d.x,
//            b.y = d.y,
//            c = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(c, {
//                x: 0,
//                y: 0
//            }),
//            d = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(a.JSQEX_From, a.JSQEX_To),
//            d = c - d - 90) : (c = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(c, {
//            x: 0,
//            y: 0
//        }),
//            d = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(b, d),
//            d = c - d);
//        if (void 0 !== d)
//            return b.rotation = d,
//                !0
//    }
//    return !1
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_tryAssignWallContents = function(a, b) {
    var c = [];
    a.forEach(function(wall) {
        Object.keys( wall.JSQEX_edge.JSQEX_embedFurns).forEach(function(b) {
            c.push(wall.JSQEX_edge.JSQEX_embedFurns[b])
        })

        Object.keys( wall.JSQEX_edge.JSQEX_OpenHoles).forEach(function(b) {
            c.push(wall.JSQEX_edge.JSQEX_OpenHoles[b])
        })
    });
    var d = function(a) {
            var c, d, h = ( a.ebParam && a.ebParam.wall ) ? a.ebParam.wall.JSQEX_cowall : ( a.wall ? a.wall.JSQEX_cowall : null );
            if ( h ) {
                b.forEach(function (b) {
                    var room = b.JSQEX_getParentRoom();
                    if ( !room ) return;
                    if (a.furnSet && ( a.furnSet !== "door" || a.furnSet !== "window" ) ) {
                        if (a.myParent !== room.ID ) return;
                    }
                    else if (a.graphID !== room.ID ) return;
                    if (b.JSQEX_isValid() && JSQEXMathematics.JSQEX_isSegmentsOverlapped(h.JSQEX_From, h.JSQEX_To, b.JSQEX_From, b.JSQEX_To)) {
                        var pos = new THREE.Vector2(a.position.x, a.position.z );
                        var n = JSQEXMathematics.JSQEX_closestDistanceToSegment(pos, b.JSQEX_From, b.JSQEX_To);
                        if (void 0 === d || n < d)
                            d = n, c = b
                    }

                });

                a.JSQEX_onEntityDirty();
            }

            if ( c ) c.JSQEX_assignContent(a)
        }
        ;
    c.forEach(function(a) {
        d(a)
    })
}
;
JSQEXBasicStructure.JSQEX_Wall.JSQEX_findNeighborWalls = function(a, b, c) {
    var d = {
        JSQEX_left: void 0,
        JSQEX_right: void 0,
        JSQEX_leftAngle: void 0,
        JSQEX_rightAngle: void 0
    };
    c || (c = [],
        JSQEXBasicStructure.JSQEX_Site_getPointOwner(b).JSQEX_walls.forEach(function(a) {
            c.includes(a.JSQEX_edge) || c.push(a.JSQEX_edge)
        }));
    if (0 === c.length)
        return d;
    var e = [];
    if (1 === c.length)
        e.push({
            JSQEX_wall: c[0],
            JSQEX_angle: 0
        });
    else {
        var f = []
            , g = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(a.JSQEX_From === b ? a.JSQEX_To : a.JSQEX_From, b);
        c.forEach(function(a) {
            var c = JSQEXMathematics.JSQEX_getAngleHorizontaleCCW(a.JSQEX_From === b ? a.JSQEX_To : a.JSQEX_From, b) - g;
            0 > c && (c += 360);
            f.push({
                JSQEX_wall: a,
                JSQEX_angle: c
            })
        });
        f.sort(function(a, b) {
            return a.JSQEX_angle - b.JSQEX_angle
        });
        a = f.length;

        e.push(f[0], f[a - 1])
    }
    a = e[0];
    e = e[1];
    a && (d.JSQEX_left = a.JSQEX_wall,
        d.JSQEX_leftAngle = a.JSQEX_angle);
    e && (d.JSQEX_right = e.JSQEX_wall,
        d.JSQEX_rightAngle = e.JSQEX_angle);
    return d
};

JSQEXBasicStructure.JSQEX_Wall.JSQEX_isWallFixedWidth = function(a) {
    return false;
//    switch (a) {
//        case JSQEXBasicStructure.JSQEX_WallTypeEnum.generic:
//            return !0;
//        default:
//            return !1
//    }
};

JSQEXBasicStructure.JSQEX_Wall.JSQEX_getRoomWallIn = function(a) {
    if (a) {
        var b = a.JSQEX_getParentRoom();
        if (b)
            return b;
        var c = [];
        Engine.mainInterface.JSQEX_structureInfos.JSQEX_forEachRoom(function(a) {
            c.push(a)
        });
        var d;
        c.some(function(b) {
            var c = b.JSQEX_toPolygon();
            return c && JSQEXMathematics.JSQEX_isPointOnPolygon(a.JSQEX_From, c) && JSQEXMathematics.JSQEX_isPointOnPolygon(a.JSQEX_To, c) ? (d = b,
                !0) : !1
        });
        return d
    }
};

JSQEXBasicStructure.JSQEX_Wall.JSQEX_isValidWall = function() {
    var a = new THREE.Vector2();

    return function(b, c) {
        if (!b)
            return !1;
        c = c || JSQEXMathematics.JSQEX_defaultTolerance;
        var d = a.subVectors(b.JSQEX_To, b.JSQEX_From);
        d.normalize();
        var e, f;
        b.JSQEX_prev && (e = a.subVectors(b.JSQEX_prev.JSQEX_To, b.JSQEX_prev.JSQEX_From),
            e.normalize());
        b.JSQEX_next && (f = a.subVectors(b.JSQEX_next.JSQEX_To, b.JSQEX_next.JSQEX_From),
            f.normalize());
        var g;
        (g = b.length > c) && !(g = !b.JSQEX_prev || b.length >= b.JSQEX_prev.JSQEX_width / 2) && (e = THREE.Vector2.JSQEX_dot(d, e),
            g = !(e >= 0 - c && e <= 1 + c));
        (e = g) && !(e = !b.JSQEX_next || b.length >= b.JSQEX_next.JSQEX_width / 2) && (d = THREE.Vector2.JSQEX_dot(d, f),
            e = !(d >= 0 - c && d <= 1 + c));
        return e
    }
}();

JSQEXBasicStructure.JSQEX_Molding = function(a) {
    JSQEXBasicStructure.BasicStructure.call(this, a);
    this.JSQEX_seekId = void 0;

    this._JSQEX_host = void 0;
    JSQEXUtilities.JSQEX_object_defineFields(this, {
        JSQEX_contentType: {
            get: function() {
                return this.JSQEX_metadata.JSQEX_contentType
            }
        },
        JSQEX_normalTexture: {
            get: function() {
                return this.JSQEX_metadata.JSQEX_normalTexture
            }
        },
        JSQEX_profile: {
            get: function() {
                return this.JSQEX_metadata.JSQEX_profile
            }
        },
        JSQEX_material: {
            initialValue: void 0,
            changed: function(a, c) {
//                this.signalMaterialChanged.dispatch({
//                    oldMaterial: a,
//                    newMaterial: c
//                })
            }
        }
    })
}
;
JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Molding, JSQEXBasicStructure.BasicStructure);
JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Molding";
JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_initByMeta = function(a) {
    this.JSQEX_metadata = a;
    this.JSQEX_mapSrc = a.JSQEX_mapSrc;
}
;
JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_getHost = function() {
    return this._JSQEX_host
}
;
JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_assignTo = function(a) {
    this._JSQEX_host = a
}
;
JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_getMaterial = function() {
    return this.JSQEX_material
};


JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_dump = function(a) {
    var b = JSQEXBasicStructure.JSQEX_Molding.superClass_.JSQEX_dump.call(this)
        , c = b[0];
    c.JSQEX_metadata = this.JSQEX_metadata;

    return b
};

JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_Molding.superClass_.JSQEX_load.call(this, a, b);
    this.JSQEX_metadata = a.JSQEX_metadata;
    this.JSQEX_mapSrc = a.JSQEX_metadata.JSQEX_mapSrc;
};


JSQEXBasicStructure.JSQEX_Molding.prototype._JSQEX_copyFrom = function(a) {
    this.JSQEX_initByMeta(a.JSQEX_metadata);
    a.JSQEX_material && (this.JSQEX_material = a.JSQEX_material.clone())
};

JSQEXBasicStructure.JSQEX_Molding.prototype.JSQEX_isSameMolding = function(a) {
    if (!a || this.JSQEX_seekId !== a.JSQEX_seekId)
        return !1;
    var b = this.JSQEX_material;
    a = a.JSQEX_material;
    return b || a ? b && a ? b.JSQEX_seekId === a.JSQEX_seekId : !1 : !0
};

JSQEXBasicStructure.JSQEX_MoldingTypeEnum = {
    JSQEX_Baseboard: "JSQEX_baseboard",
    JSQEX_Cornice: "JSQEX_cornice"
};
Object.freeze(JSQEXBasicStructure.JSQEX_MoldingTypeEnum);

JSQEXBasicStructure.JSQEX_WallMolding = function(a) {
    JSQEXBasicStructure.JSQEX_Molding.call(this, a);
    this.JSQEX_defineField("JSQEX_height");
    this.JSQEX_defineField("JSQEX_thickness");
    this.JSQEX_seekId = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_DEFAULT_MOLDING_PARAM.JSQEX_ID;
    this.JSQEX_height = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_DEFAULT_MOLDING_PARAM.JSQEX_HEIGHT;
    this.JSQEX_thickness = JSQEXBasicStructure.JSQEX_Common_Parameters.JSQEX_DEFAULT_MOLDING_PARAM.JSQEX_THICKNESS

};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_WallMolding, JSQEXBasicStructure.JSQEX_Molding);
JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_WallMolding";
JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_initByMeta = function(a) {
    JSQEXBasicStructure.JSQEX_WallMolding.superClass_.JSQEX_initByMeta.call(this, a);
    this.JSQEX_thickness = a.JSQEX_profile.JSQEX_profileSizeX;
    this.JSQEX_height = a.JSQEX_profile.JSQEX_profileSizeY;
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_dump = function(a) {
    a = JSQEXBasicStructure.JSQEX_WallMolding.superClass_.JSQEX_dump.call(this, a);
    var b = a[0];
    b.JSQEX_thickness = this.JSQEX_thickness;
    b.JSQEX_height = this.JSQEX_height;
    return a
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_WallMolding.superClass_.JSQEX_load.call(this, a, b);
    this.JSQEX_height = a.JSQEX_height;
    this.JSQEX_thickness = a.JSQEX_thickness;
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_onFieldChanged = function(a, b, c) {
    if ("JSQEX_height" === a || "JSQEX_thickness" === a)
        this.JSQEX_onEntityDirty()
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype._JSQEX_copyFrom = function(a) {
    JSQEXBasicStructure.JSQEX_WallMolding.superClass_._JSQEX_copyFrom.call(this, a);
    this.JSQEX_thickness = a.JSQEX_thickness;
    this.JSQEX_height = a.JSQEX_height
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_isSameMolding = function(a) {
    return JSQEXBasicStructure.JSQEX_WallMolding.superClass_.JSQEX_isSameMolding.call(this, a) && JSQEXMathematics.JSQEX_nearlyEquals(this.JSQEX_height, a.JSQEX_height) && JSQEXMathematics.JSQEX_nearlyEquals(this.JSQEX_thickness, a.JSQEX_thickness)
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_dirtyNeighborMoldingsByFacetype = function(a) {
    var b = this.JSQEX_getHost();
    if (b) {
        var c = b.JSQEX_prev;
        if (c && (c = c.JSQEX_getMolding(a, this.type)))
            c.JSQEX_onEntityDirty();
        if (b = b.JSQEX_next)
            if (a = b.JSQEX_getMolding(a, this.type))
                a.JSQEX_onEntityDirty()
    }
};

JSQEXBasicStructure.JSQEX_WallMolding.JSQEX_isValidMoldingType = function(a) {
    var b = !1;
    if (a === JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Baseboard || a === JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Cornice)
        b = !0;
    return b
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_getDefaultHeight = function() {
    return this.JSQEX_metadata.JSQEX_profileSizeY
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_getDefaultThickness = function() {
    return this.JSQEX_metadata.JSQEX_profileSizeX
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_draw = function() {
    if ( !this.JSQEX_Molding3DMesh ) {
        this.JSQEX_Molding3DMesh = new JSQEXBasicStructure.JSQEX_Molding3D(this);
    }
    this.JSQEX_Molding3DMesh.JSQEX_draw();
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_dispose = function() {
    if ( this.JSQEX_Molding3DMesh ) {
        this.JSQEX_Molding3DMesh.JSQEX_cleanUpElements();
        delete this.JSQEX_Molding3DMesh;
    }
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_changeMaterial = function(mapSrc) {
    this.JSQEX_mapSrc = mapSrc;
    this.JSQEX_metadata.JSQEX_mapSrc = mapSrc;
    if ( this.JSQEX_Molding3DMesh ) this.JSQEX_Molding3DMesh.JSQEX_changeMap( mapSrc );
    this.JSQEX_onEntityDirty();
};

JSQEXBasicStructure.JSQEX_WallMolding.prototype.JSQEX_changeProfile = function( points, nodes ) {
    this.JSQEX_metadata.JSQEX_profile = points;
    if ( nodes ) this.JSQEX_metadata.JSQEX_nodes = nodes;
    this.JSQEX_onEntityDirty();
};

JSQEXBasicStructure.JSQEX_Cornice = function(a) {
    JSQEXBasicStructure.JSQEX_WallMolding.call(this, a);
    this.JSQEX_defineField("JSQEX_offset");
    this.JSQEX_defineField("JSQEX_autoFit");
    this.JSQEX_offset = 0;
    this.JSQEX_autoFit = !0
};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Cornice, JSQEXBasicStructure.JSQEX_WallMolding);
JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Cornice";
JSQEXBasicStructure.JSQEX_Cornice.prototype.type = JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Cornice;
JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_initByMeta = function(a) {
    JSQEXBasicStructure.JSQEX_Cornice.superClass_.JSQEX_initByMeta.call(this, a)
};

JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_dump = function(a) {
    var b = JSQEXBasicStructure.JSQEX_Cornice.superClass_.JSQEX_dump.call(this)
        , c = b[0];
    c.JSQEX_autoFit = this.JSQEX_autoFit;
    c.JSQEX_offset = this.JSQEX_offset;
    a && a(b, this);
    return b
};

JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_clone = function() {
    var a = new JSQEXBasicStructure.JSQEX_Cornice;
    a._JSQEX_copyFrom(this);
    return a
};

JSQEXBasicStructure.JSQEX_Cornice.prototype._JSQEX_copyFrom = function(a) {
    JSQEXBasicStructure.JSQEX_Cornice.superClass_._JSQEX_copyFrom.call(this, a);
    this.JSQEX_offset = a.JSQEX_offset;
    this.JSQEX_autoFit = a.JSQEX_autoFit
};

JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_load = function(a, b) {
    JSQEXBasicStructure.JSQEX_Cornice.superClass_.JSQEX_load.call(this, a, b);
    this.JSQEX_offset = a.JSQEX_offset;
    this.JSQEX_autoFit = a.JSQEX_autoFit
};

JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_onFieldChanged = function(a, b, c) {
    JSQEXBasicStructure.JSQEX_Cornice.superClass_.JSQEX_onFieldChanged.call(this, a, b, c);
    switch (a) {
        case "JSQEX_autoFit":
            this.JSQEX_doAutoFit();
            break;
        case "JSQEX_offset":
            this.JSQEX_onEntityDirty()
    }
};

JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_isSameMolding = function(a) {
    return JSQEXBasicStructure.JSQEX_Cornice.superClass_.JSQEX_isSameMolding.call(this, a) && this.autoFit === a.autoFit && JSQEXMathematics.JSQEX_nearlyEquals(this.JSQEX_offset, a.JSQEX_offset)
};

JSQEXBasicStructure.JSQEX_Cornice.prototype.JSQEX_doAutoFit = function() {
    this.JSQEX_autoFit && this._JSQEX_updateOffset()
};

JSQEXBasicStructure.JSQEX_Cornice.prototype._JSQEX_updateOffset = function() {
    var a = 0
        , b = this.JSQEX_getHost();
    if (b && b instanceof JSQEXBasicStructure.JSQEX_CWall) {
//        var c = b.JSQEX_getUniqueParent();
//        c && c instanceof JSQEXBasicStructure.JSQEX_Room && Object.keys(c.contents).forEach(function(d) {
//            d = c.contents[d];
//            d.contentType.isTypeOf(hsw.catalog.ContentTypeEnum.ext_Ceiling) && (d = b.JSQEX_height3d - d.z,
//                a < d && (a = d))
//        }, this);
        JSQEXMathematics.JSQEX_nearlyEquals(this.JSQEX_offset, a) || (this.JSQEX_offset = a)
    }
};

JSQEXBasicStructure.JSQEX_Cornice.prototype.getDefaultOffset = function() {
    return 0
};

JSQEXBasicStructure.JSQEX_Baseboard = function(a) {
    JSQEXBasicStructure.JSQEX_WallMolding.call(this, a)
};

JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_Baseboard, JSQEXBasicStructure.JSQEX_WallMolding);
JSQEXBasicStructure.JSQEX_Baseboard.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_Baseboard";
JSQEXBasicStructure.JSQEX_Baseboard.prototype.type = JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Baseboard;
JSQEXBasicStructure.JSQEX_Baseboard.prototype.JSQEX_dump = function(a) {
    var b = JSQEXBasicStructure.JSQEX_Baseboard.superClass_.JSQEX_dump.call(this, a);
    a && a(b, this);
    return b
};

JSQEXBasicStructure.JSQEX_Baseboard.prototype.JSQEX_clone = function() {
    var a = new JSQEXBasicStructure.JSQEX_Baseboard;
    a._JSQEX_copyFrom(this);
    return a
};

JSQEXBasicStructure.JSQEX_WallMolding.JSQEX_createFromType = function(a) {
    if (a === JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Cornice)
        return new JSQEXBasicStructure.JSQEX_Cornice;
    if (a === JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Baseboard)
        return new JSQEXBasicStructure.JSQEX_Baseboard;
}

JSQEXBasicStructure.JSQEX_RoomGeometry = function(a, b) {

    this.JSQEX_room = a;
    this.JSQEX_geomMgr = b.JSQEX_manager;
    this._JSQEX_outerCeilingProfile = this._outerFloorProfile = this._innerCeilingProfile = this._innerFloorProfile = void 0;
    this._JSQEX_dirty = true;
};

Object.defineProperties(JSQEXBasicStructure.JSQEX_RoomGeometry.prototype, {
    JSQEX_innerfloor: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            this._JSQEX_innerFloorProfile = this._JSQEX_computeFloorProfile();
            return this._JSQEX_innerFloorProfile
        }
    },
    JSQEX_innerceiling: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            this._JSQEX_innerCeilingProfile = this._JSQEX_computeCeilingGeometry();
            return this._JSQEX_innerCeilingProfile
        }
    },
    JSQEX_outerfloor: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {

            this._JSQEX_outerFloorProfile = this._JSQEX_computeFloorProfile({
                side: JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_outer
            });
            return this._JSQEX_outerFloorProfile
        }
    },
    JSQEX_outerceiling: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            this._JSQEX_outerCeilingProfile = this._JSQEX_computeCeilingGeometry({
                side: JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_outer
            });
            return this._JSQEX_outerCeilingProfile
        }
    }
});

JSQEXBasicStructure.JSQEX_RoomGeometry.prototype.JSQEX_onRoomRemoved = function() {
    this.JSQEX_clearCachedData();
    this.JSQEX_geomMgr.JSQEX_removeItem(this.JSQEX_cowall)
};

JSQEXBasicStructure.JSQEX_RoomGeometry.prototype.JSQEX_clearCachedData = function() {
    this._JSQEX_outerCeilingProfile = this._JSQEX_outerFloorProfile = this._JSQEX_innerCeilingProfile = this._JSQEX_innerFloorProfile = void 0
};

JSQEXBasicStructure.JSQEX_RoomGeometry.prototype.JSQEX_clear = function() {
    this.JSQEX_clearCachedData();

};

JSQEXBasicStructure.JSQEX_RoomGeometry.prototype._JSQEX_computeFloorProfile = function(a) {
    if (this.JSQEX_room.JSQEX_root) {
        var b = !a || !a.side || a.side === JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_inner;
        var geo = this._JSQEX_getRawRoomGeometry(a);
        a = geo.JSQEX_points;
        var wG = geo.JSQEX_wallGroup;
        var owG = geo.JSQEX_outWallGroup;
        var back = a.concat();
        if (b) {
            var c = this._JSQEX_getInteriorWallPolys(function(a) {
                return a.JSQEX_isValid()
            });
            c && (b = function(a) {
                a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a, -.01);
                return a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a, .01)
            }
                ,
                a = JSQEXUtilities.JSQEX_Collision_ClipPolygon([a], c, {
                    JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_diff
                }),
                0 < a.length && (a = b(a)),
                a = a[0])
        }

        JSQEX_insertPointFromArray( a, reverseArray( back ) );
        return { JSQEX_points: a, JSQEX_wallGroup: wG, JSQEX_outWallGroup: owG };
    }
};

JSQEXBasicStructure.JSQEX_RoomGeometry.prototype._JSQEX_computeCeilingGeometry = function(a) {
    if (this.JSQEX_room.JSQEX_root) {
        a = a || {};
        var b = !a.side || a.side === JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_inner;
        a.isCeiling = !0;
        var geo = this._JSQEX_getRawRoomGeometry(a);
        a = geo.JSQEX_points;
        var wG = geo.JSQEX_wallGroup;
        var owG = geo.JSQEX_outWallGroup;
        if (b) {
            var c = this._JSQEX_getInteriorWallPolys(function(a) {
                return a.JSQEX_isValid() && !a.JSQEX_edge.JSQEX_heightEditable
            });
            c && (b = function(a) {
                a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a, -.01);
                return a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a, .01)
            }
                ,
                a = JSQEXUtilities.JSQEX_Collision_ClipPolygon([a], c, {
                    JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_diff
                }),
                0 < a.length && (a = b(a)),
                a = a[0])
        }
        return { JSQEX_points: a, JSQEX_wallGroup: wG, JSQEX_outWallGroup: owG };
    }
};

JSQEXBasicStructure.JSQEX_RoomGeometry.prototype._JSQEX_getRawRoomGeometry = function(a) {


    var b = [], c = !a || !a.side || a.side === JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_inner, d = this.JSQEX_room.JSQEX_root, e, f = a && a.isCeiling,
        g = function(a) {
            //var b = JSQEXBasicStructure.JSQEX_Wall.JSQEX_unshelveredWallGeometry(a);
            var b = Engine.mainInterface.JSQEX_GeoManager.JSQEX_getGeometry( a );
            if (b) {
                var res;
                if (b.JSQEX_geometry ) res = [ b.JSQEX_geometry[ b.JSQEX_indices[0] ], b.JSQEX_geometry[ b.JSQEX_indices[1] ],
                    b.JSQEX_geometry[ b.JSQEX_indices[2] ], b.JSQEX_geometry[ b.JSQEX_indices[3] ] ];
                if (a.JSQEX_hided || f && a.JSQEX_edge.JSQEX_heightEditable || !b.JSQEX_geometry)
                    res = [a.JSQEX_From, a.JSQEX_To, a.JSQEX_To, a.JSQEX_From];
                return res
            }
        }
        , h = [];
    do
        h.push(d),
            d = d.JSQEX_next;
    while (d && d !== this.JSQEX_room.JSQEX_root);
    var ppp;
    for (var m = 0, n = h.length; m < n; m++) {
        d = h[m];
        if (!d || !d.JSQEX_next) {
            b = [];
            break
        }
        if (JSQEXBasicStructure.JSQEX_Wall.JSQEX_isValidWall(d)||1) {
            var p = d.JSQEX_next;
            e = ( JSQEXBasicStructure.JSQEX_Wall.JSQEX_isValidWall(p) || 1) ? p : p.JSQEX_next;
            if (!e) {
                b = [];
                break
            }
            var dd = d;
            var pp = e;
            d = g(d, a);
            e = g(e, a);
            if (!d || !e) {
                b = [];
                break
            }
            JSQEXMathematics.JSQEX_isParallel(d[0], d[1], e[0], e[1]) ?
                JSQEXMathematics.JSQEX_isSamePoint(d[1], e[0]) ?  b.push(c ? d[1] : d[2]) :
                    ( ( c ? b.push(d[1], e[0]) :
                        b.push(d[2], e[3]) ) ):
                (ppp = c ? JSQEXMathematics.JSQEX_lineLineIntersection(d[0], d[1], e[0], e[1]) : JSQEXMathematics.JSQEX_lineLineIntersection(d[2], d[3], e[2], e[3]),
                    singleVertexStatus2D( dd.JSQEX_To, dd.JSQEX_From, pp.JSQEX_To ) > 0 && JSQEXMathematics.JSQEX_isPointInLineSegment( e[3], d[0], d[1] ) && b.push( e[3] ),
                    b.push(ppp),
                    singleVertexStatus2D( dd.JSQEX_To, dd.JSQEX_From, pp.JSQEX_To ) > 0 && JSQEXMathematics.JSQEX_isPointInLineSegment( d[2], e[0], e[1] ) && b.push( d[2] ) );
            d = p
        }
    }
    a = b;
    b = [];
    c = a.length;

    for ( var g = 0; g < c; g++)
        h = a[g],
            (m = a[g + 1]) && JSQEXMathematics.JSQEX_isSamePoint(h, m) || ( b.push(h) );
    return { JSQEX_points: b };
};

JSQEXBasicStructure.JSQEX_RoomGeometry.prototype._JSQEX_getInteriorWallPolys = function(a) {
    var b = this.JSQEX_room.JSQEX_toPolygon();
    if (b) {
        var c = JSQEXBasicStructure.JSQEX_Room.JSQEX_findInteriorWallsConnectedToRoom(this.JSQEX_room, function(c) {
            return JSQEXMathematics.JSQEX_isPointOnPolygon(c.JSQEX_From, b) && JSQEXMathematics.JSQEX_isPointOnPolygon(c.JSQEX_To, b) && (!a || a(c))
        });
        if (0 !== c.length) {
            var d = function(a) {
                    return (a = this.JSQEX_geomMgr.JSQEX_getGeometry(a)) ? a.JSQEX_geometry : void 0
                }
                    .bind(this)
                , e = function(a) {
                    a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a, -.01);
                    return a = JSQEXUtilities.JSQEX_Collision_OffsetPolygon(a, .01)
                }
                ;
            if (1 === c.length)
                return (e =
                    d(c[0])) ? [e] : void 0;
            var f = new Set;
            this.JSQEX_room.JSQEX_getRoomPoints().forEach(function(a) {
                f.add(a)
            });
            var g = []
                , h = [];
            c.forEach(function(a) {
                var b = d(a);
                b && (f.has(a.JSQEX_From) || f.has(a.JSQEX_To) ? g.push(b) : h.push(b))
            });
            if (0 !== g.length) {
                if (0 === h.length)
                    return g;
                c = JSQEXUtilities.JSQEX_Collision_ClipPolygon(g, h, {
                    JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_union
                });
                0 < c.length && (c = e(c));
                return c
            }
        }
    }
};



JSQEXBasicStructure.JSQEX_WallGeometry = function(a, b) {
    this.JSQEX_cowall = a;
    this._JSQEX_dirty = !0;
    this.JSQEX_database = b.JSQEX_database;
    this.JSQEX_geomMgr = b.JSQEX_manager;
    this.JSQEX_partialWalls = {};
    this.JSQEX_clearCachedData();
};

Object.defineProperties(JSQEXBasicStructure.JSQEX_WallGeometry.prototype, {
    JSQEX_geometry: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            this._JSQEX_dirty && this.JSQEX_compute();
            return this._JSQEX_profile
        }
    },
    JSQEX_indices: {
        writeable: !1,
        enumerable: !1,
        configurable: !1,
        get: function() {
            this._JSQEX_dirty && this.JSQEX_compute();
            return this._JSQEX_indices
        }
    }
});

JSQEXBasicStructure.JSQEX_WallGeometry.prototype.JSQEX_setPartialWalls = function(a) {
    this.JSQEX_partialWalls = a;
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype.JSQEX_onCoWallReomved = function() {
    this.JSQEX_clearCachedData();
    this.JSQEX_geomMgr.JSQEX_removeItem(this.JSQEX_cowall)
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype.JSQEX_clearCachedData = function() {
    this.JSQEX_database.delete(this.JSQEX_cowall.JSQEX_From.ID);
    this.JSQEX_database.delete(this.JSQEX_cowall.JSQEX_To.ID);
    this._JSQEX_indices = this._JSQEX_profile = void 0;
    this._JSQEX_dirty = !0
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype.JSQEX_clear = function() {
    this.JSQEX_clearCachedData();
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype._JSQEX_computeProfile = function() {
    var a = JSQEXBasicStructure.JSQEX_Wall.JSQEX_unshelveredWallGeometry(this.JSQEX_cowall);
    this._JSQEX_profile = a;
    this._JSQEX_indices = [0, 1, 2, 3];
    var b = this.JSQEX_cowall.JSQEX_From, c = this.JSQEX_cowall.JSQEX_To, d;
    this.JSQEX_database.has(b.ID) ? d = this.JSQEX_database.get(b.ID) : (d = this._JSQEX_computeWallGeomsAtEndPoint(b, this.JSQEX_partialWalls[b.ID]),
        this.JSQEX_database.set(b.ID, d));
    this.JSQEX_database.has(c.ID) ? b = this.JSQEX_database.get(c.ID) : (b = this._JSQEX_computeWallGeomsAtEndPoint(c, this.JSQEX_partialWalls[c.ID]),
        this.JSQEX_database.set(c.ID, b));
    c = d ? d[this.JSQEX_cowall.JSQEX_edge.ID] :
        void 0;
    d = b ? b[this.JSQEX_cowall.JSQEX_edge.ID] : void 0;
    c && d && a && (a = this._JSQEX_combineGeometry(c, d, a)) && (this._JSQEX_profile = a.JSQEX_geometry,
        this._JSQEX_indices = a.JSQEX_indices)
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype.JSQEX_compute = function() {
    this._JSQEX_dirty && (this._JSQEX_computeProfile(),
        this._JSQEX_dirty = !1)
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype._JSQEX_combineGeometry = function(a, b, c) {
    if (c) {
        var d = {
            JSQEX_geometry: c,
            JSQEX_indices: [0, 1, 2, 3]
        };
        if (!a && !b)
            return d;
        var e = c[0]
            , f = c[1]
            , g = c[2]
            , h = c[3]
            , m = function(a) {
                return void 0 !== a[0] && void 0 !== a[1] && void 0 !== a[2] && void 0 !== a[3]
            }
            , n = function(a) {
                for (var b = [], c = 0; c < a.length; c++) {
                    var d = (c + 1) % a.length
                        , m = a[c]
                        , n = a[d];
                    JSQEXMathematics.JSQEX_isSameLine(e, f, m, n) ? (b[0] = c,
                        b[1] = d) : JSQEXMathematics.JSQEX_isSameLine(g, h, m, n) && (b[2] = c,
                        b[3] = d)
                }
                return b
            }
            , p = function(a) {
                if (a) {
                    var b = a.slice();
                    b.push(b[0]);
                    0 < JSQEXMathematics.JSQEX_getMassProperties(b)[0] &&
                    a.reverse()
                }
            }
            ;
        p(a);
        p(b);
        if (!a || !b)
            return a = a || b,
                b = n(a),
                m(b) ? {
                    JSQEX_geometry: a,
                    JSQEX_indices: b
                } : d;
        p = n(a);
        d = n(b);
        if (!m(p) || !m(d))
            return {
                JSQEX_geometry: c,
                JSQEX_indices: [0, 1, 2, 3]
            };
        m = [];
        c = [];
        n = p[3];
        p = p[0];
        for (c[3] = 0; n !== p; )
            m.push(a[n]),
                n++,
                n %= a.length;
        m.push(a[p]);
        c[0] = m.length - 1;
        n = d[1];
        p = d[2];
        for (c[1] = c[0] + 1; n !== p; )
            m.push(b[n]),
                n++,
                n %= b.length;
        m.push(b[p]);
        c[2] = m.length - 1;
        return {
            JSQEX_geometry: m,
            JSQEX_indices: c
        }
    }
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype._JSQEX_computeWallGeomsAtEndPoint = function(a, b) {
    var c = {}
        , d = JSQEXBasicStructure.JSQEX_Site_getPointOwner(a);
    b = b || [];
    var e = []
        , f = []
        , g = []
        , h = {}
        , m = function(a, b) {
            b.includes(a) || (b.push(a),
                h[a.ID] = JSQEXBasicStructure.JSQEX_Wall.JSQEX_unshelveredWallGeometry(a))
        }
        ;
    d.JSQEX_walls.forEach(function(a) {
        JSQEXBasicStructure.JSQEX_Wall.JSQEX_isValidWall(a) && !a.JSQEX_hided && (m(a.JSQEX_edge, g),
                a.JSQEX_edge.JSQEX_heightEditable || b.includes(a.JSQEX_edge) ? m(a.JSQEX_edge, e) : m(a.JSQEX_edge, f))
    });
    if (0 !== g.length) {
        if (1 === g.length) {
            var d =
                    g[0]
                , n = h[d.ID];
            n && (c[d.ID] = n);
            return c
        }
        var p = function(a, b) {
                var c = [];
                b.forEach(function(b) {
                    a !== b && c.push(b)
                });
                return c
            }
            , d = function(b) {
                b.forEach(function(d) {
                    var e = p(d, b)
                        , e = JSQEXBasicStructure.JSQEX_Wall.JSQEX_findNeighborWalls(d, a, e);
                    (e = this._JSQEX_computeWallGeomAtEndPoint(d, a, e.JSQEX_left, e.JSQEX_right, h)) && (c[d.ID] = e)
                }, this)
            }
                .bind(this)
            , n = function(b, c) {
                var d = c[0]
                    , e = [];
                c.forEach(function(a) {
                    .01 > Math.abs(a.JSQEX_height3d - d.JSQEX_height3d) && e.push(a)
                });
                if (1 === e)
                    return d;
                var f = JSQEXBasicStructure.JSQEX_Wall.JSQEX_findNeighborWalls(b, a, e)
                    , g = f.JSQEX_right ? f.JSQEX_rightAngle : 0
                    , h = d;
                return h =
                        Math.abs(f.JSQEX_left ? f.JSQEX_leftAngle : 0) < Math.abs(g) ? f.JSQEX_left || h : f.JSQEX_right || h
            }
            , q = [];
        e.forEach(function(a) {
            m(a, q)
        });
        q = q.sort(function(a, b) {
            return b.JSQEX_height3d - a.JSQEX_height3d
        });
        d(f);
        if (0 === q.length)
            return c;
        var r = []
            , t = []
            , u = void 0;
        (function() {
            t.push(q[0]);
            u = q[0].JSQEX_height3d;
            for (var a = 1; a < q.length; a++) {
                var b = q[a];
                JSQEXMathematics.JSQEX_nearlyEquals(b.JSQEX_height3d, u, .01) ? t.push(b) : 0 < t.length && (r.push(t),
                    t = [b]);
                u = b.JSQEX_height3d
            }
            0 < t.length && r.push(t)
        })();
        if (0 === f.length)
            if (n = r[0],
                1 < n.length)
                d(n),
                    n.forEach(function(a) {
                        q.JSQEX_xRemove(a)
                    });
            else {
                var x =
                        r[1]
                    , d = n[0];
                (n = x ? x[0] : void 0) ? ((n = this._JSQEX_wallTrimedGeometry(d, n, a, h[d.ID], h[n.ID])) && (c[d.ID] = n),
                    q.JSQEX_xRemove(d)) : console.log( "Invalid wall counts on connection point.")
            }
        else if (1 === f.length) {
            d = f[0];
            n = n(d, q);
            x = JSQEXMathematics.JSQEX_lineLineAngleCCW(a, d.JSQEX_From === a ? d.JSQEX_To : d.JSQEX_From, a, n.JSQEX_From === a ? n.JSQEX_To : n.JSQEX_From);
            -180 > x && (x += 360);
            180 < x && (x -= 360);
            var y = void 0;
            (y = 135 > Math.abs(x) ? this._JSQEX_wallTrimedGeometry(d, n, a, h[d.ID], h[n.ID]) : this._JSQEX_computeWallGeomAtEndPoint(d, a, n, void 0, h)) && (c[d.ID] = y)
        }
        q.forEach(function(b) {
            var d = this._JSQEX_computePartialWallGeomAtEndPoint(b,
                a, c, h[b.ID]);
            d && (c[b.ID] = d)
        }, this);
        return c
    }
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype._JSQEX_computeWallGeomAtEndPoint = function(a, b, c, d, e) {
    var f = function(b) {
            return e && e[b.ID] ? e[b.ID] : JSQEXBasicStructure.JSQEX_Wall.JSQEX_unshelveredWallGeometry(a)
        }
        , g = f(a);
    if (g) {
        if (!c && !d)
            return g;
        var h = {
                x: b.x,
                y: b.y
            }
            , m = [g[0], g[1]]
            , n = [g[3], g[2]];
        b === a.JSQEX_From && (m = [g[2], g[3]],
            n = [g[1], g[0]]);
        var p = function(a, b, c, d, e) {
                b = JSQEXMathematics.JSQEX_getLerpNumber(b, c, a);
                a = JSQEXMathematics.JSQEX_getLerpNumber(d, e, a);
                return 1 < b && 2 > b && 1 < a && 2 > a || 0 <= b && 1 >= b && 0 <= a && 1 >= a
            }
            , g = function(c) {
                if (JSQEXMathematics.JSQEX_isParallel(a.JSQEX_From, a.JSQEX_To, c.JSQEX_From,
                    c.JSQEX_To))
                    return {
                        JSQEX_leftPt: n[1],
                        JSQEX_rightPt: m[1]
                    };
                var d = f(c)
                    , e = [d[0], d[1]]
                    , g = [d[3], d[2]];
                b === c.JSQEX_From && (e = [d[2], d[3]],
                    g = [d[1], d[0]]);
                c = JSQEXMathematics.JSQEX_lineLineIntersection(n[0], n[1], e[0], e[1]);
                p(c, n[0], n[1], e[0], e[1]) || (c = JSQEXMathematics.JSQEX_lineLineIntersection(n[0], n[1], e[1], g[1]),
                    JSQEXMathematics.JSQEX_isPointInLineSegment(c, e[1], g[1]) || (c = n[1]));
                d = JSQEXMathematics.JSQEX_lineLineIntersection(m[0], m[1], g[0], g[1]);
                p(d, m[0], m[1], g[0], g[1]) || (d = JSQEXMathematics.JSQEX_lineLineIntersection(m[0], m[1], e[1], g[1]),
                    JSQEXMathematics.JSQEX_isPointInLineSegment(d,
                        e[1], g[1]) || (d = m[1]));
                return {
                    JSQEX_leftPt: c,
                    JSQEX_rightPt: d
                }
            }
            ;
        if (!c || !d)
            return c = g(c || d),
                [m[0], c.JSQEX_rightPt, h, c.JSQEX_leftPt, n[0]];
        d = g(d);
        c = g(c);
        return [m[0], d.JSQEX_rightPt, h, c.JSQEX_leftPt, n[0]]
    }
};

JSQEXBasicStructure.JSQEX_WallGeometry.prototype._JSQEX_wallTrimedGeometry = function(a, b, c, d, e) {
    if (d && e) {
        if (JSQEXMathematics.JSQEX_isParallel(a.JSQEX_From, a.JSQEX_To, b.JSQEX_From, b.JSQEX_To, .01))
            return d;
        b = [d[0], d[1]];
        var f = [d[3], d[2]];
        c === a.JSQEX_From && (b = [d[2], d[3]],
            f = [d[1], d[0]]);
        c = function(a) {
            var b = [e[0], e[1]]
                , c = [e[2], e[3]]
                , b = JSQEXMathematics.JSQEX_lineLineIntersection(b[0], b[1], a[0], a[1])
                , c = JSQEXMathematics.JSQEX_lineLineIntersection(c[0], c[1], a[0], a[1])
                , d = JSQEXMathematics.JSQEX_pointLength(a[0], b);
            a = JSQEXMathematics.JSQEX_pointLength(a[0], c);
            return d > a ? b : c
        }
        ;
        a = c(b);
        c = c(f);
        return [b[0],
            a, c, f[0]]
    }
}
;
JSQEXBasicStructure.JSQEX_WallGeometry.prototype._JSQEX_computePartialWallGeomAtEndPoint = function(a, b, c, d) {
    if (d) {
        var e = [d[0], d[1]]
            , f = [d[3], d[2]];
        b === a.JSQEX_From && (e = [d[2], d[3]],
            f = [d[1], d[0]]);
        var g = function(a) {
                var b = [], d;
                for (d in c)
                    if (c.hasOwnProperty(d)) {
                        var e = c[d];
                        if (e)
                            for (var f = 0, g = e.length; f < g; f++) {
                                var h = e[f]
                                    , m = e[(f + 1 + g) % g];
                                if (!JSQEXMathematics.JSQEX_isParallel(h, m, a[0], a[1])) {
                                    var n = JSQEXMathematics.JSQEX_lineLineIntersection(h, m, a[0], a[1]);
                                    JSQEXMathematics.JSQEX_isPointInLineSegment(n, h, m, .01) && b.push({
                                        JSQEX_point: n,
                                        JSQEX_segment: [h, m]
                                    })
                                }
                            }
                    }
                var p = []
                    , B = void 0;
                b.forEach(function(b) {
                    var c = JSQEXMathematics.JSQEX_pointLength(b.JSQEX_point, a[0]);
                    void 0 === B || JSQEXMathematics.JSQEX_nearlyEquals(B, c, .01) ? (B = c,
                        p.push(b)) : c < B && (B = c,
                        p.length = 0,
                        p.push(b))
                });
                return p
            }
            ;
        a = function(a, b, c, d) {
            for (var e = !1, f = 0, g = a.length; f < g; f++) {
                var h = a[f]
                    , m = a[(f + 1 + g) % g];
                if (!e && JSQEXMathematics.JSQEX_isPointInLineSegment(b, h, m))
                    e = !0;
                else if (e && d.push(h),
                    e && JSQEXMathematics.JSQEX_isPointInLineSegment(c, h, m))
                    break
            }
        }
        ;
        b = function() {
            var a = [], b;
            for (b in c)
                c.hasOwnProperty(b) && a.push(c[b]);
            if (1 === a.length)
                return a[0];
            b = {
                JSQEX_operation: JSQEXUtilities.JSQEX_Collision_ClipType.JSQEX_union
            };
            b = JSQEXUtilities.JSQEX_Collision_ClipPolygon([a[0]], a.slice(1), b);
            return 0 === b.length ? a[0] : b[0]
        }
        ;
        d = g(e);
        var h = g(f), m, n, p;
        if (0 < d.length && 0 < h.length)
            return p = d.find(function(a) {
                var b = a.JSQEX_segment;
                return h.find(function(a) {
                    var c = a.JSQEX_segment;
                    if (JSQEXMathematics.JSQEX_isSameLineSegment(b[0], b[1], c[0], c[1], .01))
                        return a
                })
            }),
                g = d[0],
                d = h[0],
                m = (p = p ? p.JSQEX_segment : void 0) || g.JSQEX_segment,
                n = p || d.JSQEX_segment,
                p = [e[0], g.JSQEX_point],
                JSQEXMathematics.JSQEX_isSameLine(m[0], m[1], n[0], n[1], .01) || (e = b(),
                a(e, g.JSQEX_point, d.JSQEX_point, p)),
                p.push(d.JSQEX_point, f[0]),
                p;
        if (0 < d.length)
            return g =
                d[0],
                m = g.JSQEX_segment,
                p = [e[0], g.JSQEX_point],
                e = JSQEXMathematics.JSQEX_lineLineIntersection(m[0], m[1], f[0], f[1], .01),
                p.push(e, f[0]),
                p;
        if (0 < h.length)
            return d = h[0],
                n = d.JSQEX_segment,
                p = [e[0]],
                e = JSQEXMathematics.JSQEX_lineLineIntersection(n[0], n[1], e[0], e[1], .01),
                p.push(e, d.JSQEX_point, f[0]),
                p
    }
};

JSQEXBasicStructure.JSQEX_WallMoldingGeometry = function(a, b) {
    this.JSQEX_wallMolding = a;
    this.JSQEX_geomMgr = b.JSQEX_manager
};

JSQEXBasicStructure.JSQEX_WallMoldingGeometry.prototype.JSQEX_getWallMoldingData = function(a) {
    var b = 0
        , b = this.JSQEX_wallMolding.JSQEX_getHost()
        , b = a === JSQEXBasicStructure.JSQEX_Wall.JSQEX_WallSurfaceTypeEnum.JSQEX_inner ? this._JSQEX_computeInnerWallLength(b) : this._JSQEX_computeOuterWallLength(b);
    a = this._JSQEX_calculateOpeningImpact(b);
    return {
        materialId: this.JSQEX_wallMolding.JSQEX_material,
        length: a
    }
};

JSQEXBasicStructure.JSQEX_WallMoldingGeometry.prototype._JSQEX_computeInnerWallLength = function(a) {
    a = this.JSQEX_geomMgr.JSQEX_getGeometry(a);
    var b = 0
        , b = a.JSQEX_geometry[a.JSQEX_indices[0]];
    a = a.JSQEX_geometry[a.JSQEX_indices[1]];
    return b = Math.hypot(a.y - b.y, a.x - b.x)
};

JSQEXBasicStructure.JSQEX_WallMoldingGeometry.prototype._JSQEX_computeOuterWallLength = function(a) {
    a = this.JSQEX_geomMgr.JSQEX_getGeometry(a);
    var b = 0
        , b = a.JSQEX_geometry[a.JSQEX_indices[2]];
    a = a.JSQEX_geometry[a.JSQEX_indices[3]];
    return b = Math.hypot(a.y - b.y, a.x - b.x)
};

JSQEXBasicStructure.JSQEX_WallMoldingGeometry.prototype._JSQEX_calculateOpeningImpact = function(a) {
    var b = this.JSQEX_wallMolding.JSQEX_getHost();

    if (this.JSQEX_wallMolding.type === JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Baseboard) {
        var c = 0
            , d = b.JSQEX_edge.JSQEX_embedFurns;
        Object.keys(d).forEach(function(a) {
            a = d[a];
            !a.JSQEX_hided && JSQEXMathematics.JSQEX_isZero(a.z) && (c += a.JSQEX_XSize,
                a = a.JSQEX_getPocket()) && (a = JSQEXBasicStructure.JSQEX_WallMoldingGeometry.JSQEX_getPocketOffsetIntoWall(a),
                c += 2 * a)
        });
        a -= c
    }
    return 0 < a ? a : 0
}
;
JSQEXBasicStructure.JSQEX_WallMoldingGeometry.JSQEX_getPocketOffsetIntoWall = function(a) {
    //return a ? a.metadata ? a.metadata.profileSizeX - hsw.view.webgl3d.Constants.POCKET_FRAME_THICKNESS : 0 : 0
}
;
JSQEXBasicStructure.JSQEX_WallMoldingGeometry.clear = function() {}

JSQEXBasicStructure.JSQEX_GeometryManager = function() {
    this.JSQEX_geometries = new Map;
    this._JSQEX_wallCachedData = new Map;
    this.JSQEX_roomCachedData = new Map;
};

JSQEXBasicStructure.JSQEX_GeometryManager.prototype.JSQEX_getGeometry = function(a, b) {
    if (a instanceof JSQEXBasicStructure.JSQEX_CWall)
        return this._JSQEX_getWallGeometry(a, b);
    if (a instanceof JSQEXBasicStructure.JSQEX_Room)
        return this._JSQEX_getRoomGeometry(a, b);

};

JSQEXBasicStructure.JSQEX_GeometryManager.prototype._JSQEX_getRoomGeometry = function(a) {
    var c = this.JSQEX_geometries.get(a.ID);
    c || (c = new JSQEXBasicStructure.JSQEX_RoomGeometry(a,{
        JSQEX_database: this.JSQEX_roomCachedData,
        JSQEX_manager: this
    }),
        this.JSQEX_geometries.set(a.ID, c));
    var d;
    c._JSQEX_dirty = true;
    d = c.JSQEX_innerfloor;
    var f = c.JSQEX_innerceiling;
    var e = c.JSQEX_outerfloor;

    return {
        JSQEX_floor: d ? d.JSQEX_points.slice(0) : void 0,

        JSQEX_ceiling: f ? f.JSQEX_points.slice(0) : void 0,
        JSQEX_outFloor: e ? e.JSQEX_points.slice(0) : void 0
    }
};

JSQEXBasicStructure.JSQEX_GeometryManager.prototype._JSQEX_getWallGeometry = function(a, b) {
    var c = this.JSQEX_geometries.get(a.ID);
    c || (c = new JSQEXBasicStructure.JSQEX_WallGeometry(a,{
        JSQEX_database: this._JSQEX_wallCachedData,
        JSQEX_manager: this
    }),
        this.JSQEX_geometries.set(a.ID, c));
    var d = {};
    //c._JSQEX_dirty = a._JSQEX_boundDirty;
    c._JSQEX_dirty = true;
    b && b.JSQEX_partialWalls && (d = b.JSQEX_partialWalls);
    c.JSQEX_setPartialWalls(d);
    var ret = {
        JSQEX_geometry: c.JSQEX_geometry ? c.JSQEX_geometry.slice(0) : void 0,
        JSQEX_indices: c.JSQEX_indices ? c.JSQEX_indices.slice(0) : void 0

    }
    a._JSQEX_boundDirty = false;
    return ret;
};

JSQEXBasicStructure.JSQEX_GeometryManager.prototype.JSQEX_removeItem = function(a) {
    if (a) {
        var b = this.JSQEX_geometries.get(a.ID);
    b && (b.JSQEX_clear(),
            this.JSQEX_geometries.delete(a.ID))
    }
};

JSQEXBasicStructure.JSQEX_GeometryManager.prototype.JSQEX_clearGeometryCache = function(a) {
    (a = this.JSQEX_geometries.get(a)) && a.JSQEX_clearCachedData()
};

JSQEXBasicStructure.JSQEX_GeometryManager.prototype.JSQEX_clear = function() {
    this.JSQEX_geometries.forEach(function(a) {
        a.JSQEX_clear()
    });
    this.JSQEX_geometries.clear()
};

JSQEXBasicStructure.JSQEX_GeometryManager.prototype.JSQEX_dump = function() {
    var a = "Total count: " + this.JSQEX_geometries.size
        , a = a + "\nEntities: ";
    this.JSQEX_geometries.forEach(function(b, c) {
        a += c;
        a += " "
    });
    return a
};

JSQEXBasicStructure.JSQEX_FloorPlan = function() {
    JSQEXBasicStructure.BasicStructure.call(this, void 0);

    this.JSQEX_rooms = {};
    this.JSQEX_contents = {};
    this.JSQEX_walls = {};
    this.JSQEX_groups = {};
    //this.JSQEX_CoWallGroup = {};
}
;
JSQEXUtilities.JSQEX_inherits(JSQEXBasicStructure.JSQEX_FloorPlan, JSQEXBasicStructure.BasicStructure);
JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_Class = "JSQEXBasicStructure.JSQEX_FloorPlan";

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_addChild = function(a, b) {
    var c = JSQEXBasicStructure.JSQEX_FloorPlan.superClass_.JSQEX_addChild.call(this, a, b);
    if ( a instanceof JSQEXBasicStructure.JSQEX_Room )
        this.JSQEX_rooms[ a.ID ] = a;
    else if ( a instanceof JSQEXBasicStructure.JSQEX_CWall )
        this.JSQEX_walls[ a.ID ] = a;
    return c;
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_removeChild = function(a, b) {
    var c = JSQEXBasicStructure.JSQEX_FloorPlan.superClass_.JSQEX_removeChild.call(this, a, b);
    if ( c instanceof JSQEXBasicStructure.JSQEX_Room )
        delete this.JSQEX_rooms[ c.ID ];
    else if ( c instanceof JSQEXBasicStructure.JSQEX_CWall )
        delete this.JSQEX_walls[ c.ID ];
    else if ( c instanceof THREE.Mesh ) {
        delete this.JSQEX_contents[ c.id ];
    }
    return c;
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype._JSQEX_removeChild = function(a, b, c) {
    var c = JSQEXBasicStructure.JSQEX_FloorPlan.superClass_._JSQEX_removeChild.call(this, a, b, c);
    if ( c instanceof JSQEXBasicStructure.JSQEX_Room )
        delete this.JSQEX_rooms[ c.ID ];
    else if ( c instanceof JSQEXBasicStructure.JSQEX_CWall )
        delete this.JSQEX_walls[ c.ID ];
    else if ( c instanceof THREE.Mesh ) {
        delete this.JSQEX_contents[ c.id ];
    }
    return c;
}

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_forEachRoom = function(a, b) {
    a && Object.keys(this.JSQEX_rooms).forEach(function(c) {
        a.call(b, this.JSQEX_rooms[c])
    }, this)
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_forEachWall = function( a, b ) {
    a && (this.JSQEX_forEachRoom(function(c) {
        c.JSQEX_forEachWall(function(c) {
            a.call(b, c)
        })
    }),
        Object.keys(this.JSQEX_walls).forEach(function(c) {
            a.call(b, this.JSQEX_walls[c])
        }, this))
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_forEachContent = function(a, b) {
    a && Object.keys(this.JSQEX_contents).forEach(function(c) {
        a.call(b, this.JSQEX_contents[c])
    }, this)
};



JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_updateWallMat = function() {

    this.JSQEX_forEachWall( function( cowall ) {
        if ( cowall.JSQEX_WallMesh3D ) {
            Object.keys( cowall.JSQEX_WallMesh3D.JSQEX_WallPlanes).forEach( function( type ) {
                //if ( type.indexOf("outer") < 0 ) {
                    if ( cowall.JSQEX_WallMesh3D.JSQEX_WallPlanes[type].material instanceof THREE.MeshBasicMaterial )
                        cowall.JSQEX_WallMesh3D.JSQEX_createMesh( true );
                //}
            } );

        }
    } );
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_updateRoomMat = function() {
    this.JSQEX_forEachRoom( function( room ) {
        if ( room.JSQEX_graph ) {
            var floor = room.JSQEX_graph.mirrorFloor;
            if ( ( floor && ( floor.material instanceof THREE.MeshBasicMaterial ) ) || !floor ) {
                room.JSQEX_graph.deleteFloor(true);
                room.JSQEX_graph.deleteCeiling();
                var oldPointList = room.JSQEX_graph.pointList.concat();
                room.JSQEX_graph.mapPointSites(undefined, undefined, undefined, true, oldPointList);
            }
        }
    } );
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_updateAllMat = function() {
    this.JSQEX_updateWallMat();
    this.JSQEX_updateRoomMat();

    JSQEXUtilities.JSQEX_dispatchEvent( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_clearUpdate, {} );
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_getAllWalls = function() {
    var wallGroup = [];
    this.JSQEX_forEachWall( function(wall) {
        if ( wall.JSQEX_WallMesh ) wallGroup.push( wall.JSQEX_WallMesh );
    } );
    return wallGroup;
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_load = function( a, b ) {
    JSQEXBasicStructure.JSQEX_FloorPlan.superClass_.JSQEX_load.call(this, a, b);
    var e;
    for (var c = 0, d = a.JSQEX_children.length; c < d; ++c)
         e = a.JSQEX_children[c],
            (e = this._JSQEX_loadEntity(b.JSQEX_data[e], b)) && e instanceof JSQEXBasicStructure.JSQEX_CWall && this.JSQEX_addChild(e)
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_dump = function(a, structureOnly) {
    //if ( this.JSQEX_removed ) return [];
    var b = JSQEXBasicStructure.JSQEX_FloorPlan.superClass_.JSQEX_dump.call(this, a, structureOnly)
        , c = b[0];

    for ( var h in this.JSQEX_rooms )
        b = b.concat( this.JSQEX_rooms[ h ].JSQEX_dump(a, structureOnly) )
    for (var d in this.JSQEX_contents)
        b = b.concat(this.JSQEX_contents[d].JSQEX_dump(a, structureOnly));

    for (var f in this.JSQEX_walls)
        b = b.concat(this.JSQEX_walls[f].JSQEX_dump(a, structureOnly));


    a && a(b, this);
    return b
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_assignContent = function( content ) {
    var si = Engine.mainInterface.JSQEX_structureInfos;
    var db = JSQEXBasicStructure.BasicStructure.prototype.JSQEX_database;
    if ( content.furnSet ) {
        Engine.interfaceController.clearFurnHole( content );
        if ( content.myParent !== this.ID ) {
            var oldRoom = db[ content.myParent ];
            if ( oldRoom ) delete oldRoom.JSQEX_contents[ content.id ];
            this.JSQEX_contents[ content.id ] = content;
            content.myParent = this.ID;
            content.profile.graphID = this.ID;

        }
    }
    else if ( content.isParquet || content.isAttPlane ) {
        if ( content.graphID !== this.ID ) {
            oldRoom = si.JSQEX_rooms[ content.graphID ];
            delete oldRoom.JSQEX_contents[ content.id ];
            this.JSQEX_contents[ content.id ] = content;
            content.graphID = this.ID;
        }
    }

};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_clear = function() {

    for (var a = Object.keys(this.JSQEX_children), b = 0; b < a.length; ++b)
        this.JSQEX_removeChild(a[b], !1);

};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_saveToJSON = function(a, structureOnly) {
    a = a || {};


    var c = new Set
        , d = this.JSQEX_dump(a.callback, structureOnly).filter(function(a) {
            a = a.id;
            if (c.has(a))
                return !1;
            c.add(a);
            return !0
        })

    console.log( d );
    return d;
};

JSQEXBasicStructure.JSQEX_FloorPlan.prototype.JSQEX_loadScene = function(data) {

    JSQEXBasicStructure.JSQEX_LoadNextID = 0;
    var d = {
        JSQEX_data: {}
    };

    var e = [], f = [], g = [], h = [], m = [], attPlanes = [], parquets = [], furns = [], holes = [], n,
        p = 0, corePlanes = [];
    data.forEach(function(a) {
        d.JSQEX_data[a.id] = a;
        var b = Number(a.id);
        !Number.isNaN(b) && p < b && (p = b);
        !Number.isNaN(b) && JSQEXBasicStructure.JSQEX_LoadNextID < b && (JSQEXBasicStructure.JSQEX_LoadNextID = b);
        switch (a.JSQEX_Class) {
            case "JSQEXBasicStructure.JSQEX_Wall":
                e.push(a);
                break;
            case "JSQEXBasicStructure.JSQEX_CWall":
                f.push(a);
                break;
            case "JSQEXBasicStructure.JSQEX_Room":
                g.push(a);
                break;
            case "JSQEXBasicStructure.JSQEX_FloorPlan":
                n = a;
                break;
            default :
                if ( a.isFurn ) furns.push( a );
                else if ( a.isAttPlane ) attPlanes.push( a );
                else if (a.isParquet ) parquets.push( a );
                else if (a.isHole ) holes.push( a );
                else if (a.JSQEX_isCorePlane) corePlanes.push( a );
                break;
        }


    });
    JSQEXBasicStructure.JSQEX_NextID = p + 1;
    for (var b = 0; b < e.length; ++b) {
        var q = e[b];
        this._JSQEX_loadEntity(q, d)
    }
    for (b = 0; b < f.length; ++b)
        q = f[b],
            this._JSQEX_loadEntity(q, d);
    for (b = 0; b < g.length; ++b)
        q = g[b],
            q = this._JSQEX_loadEntity(q, d),
            2 < q.JSQEX_getBuildingWalls().length && this.JSQEX_addChild(q);
    for (b = 0; b < m.length; ++b)
        q = m[b],
            this._JSQEX_loadEntity(q, d);


    this.JSQEX_load(n, d);

    if ( JSQEXBasicStructure.JSQEX_NextID < JSQEXBasicStructure.JSQEX_LoadNextID ) JSQEXBasicStructure.JSQEX_NextID = JSQEXBasicStructure.JSQEX_LoadNextID + 1;
    return { JSQEX_furniture: furns, JSQEX_attPlanes: attPlanes, JSQEX_parquets: parquets, JSQEX_holes: holes, JSQEX_corePlanes: corePlanes };
};

JSQEXUtilities.JSQEX_Transaction = {};


JSQEXUtilities.JSQEX_Transaction.JSQEX_savePointToData = function(a, b) {
    var c = [];
    if (a.JSQEX_parents)
        for (var d in a.JSQEX_parents)
            c.push(a.JSQEX_parents[d]);
    b[a.ID] = {
        JSQEX_entity: a,
        JSQEX_parents: c,
        x: a.x,
        y: a.y,
        z: a.z
    }
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_saveWallToData = function(a, b) {
    if (a) {
        var c = [], d = [], e;
//        for (e in a.openings)
//            c.push(e);
//        for (e in a.contents)
//            d.push(e);
        b[a.ID] = {
            JSQEX_entity: a,
            JSQEX_From: a.JSQEX_From,
            JSQEX_To: a.JSQEX_To,
            JSQEX_CoEdge: a.JSQEX_CoEdge,
            JSQEX_height3d: a.JSQEX_height3d,
            JSQEX_hided: a.JSQEX_hided,
            JSQEX_heightEditable: a.JSQEX_heightEditable
        };
        c = function(a) {
            if (a) {
                var c = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]];
                b[a.ID] = {
                    JSQEX_prev: a.JSQEX_prev,
                    JSQEX_next: a.JSQEX_next,
                    JSQEX_parent: c,
                    JSQEX_edge: a.JSQEX_edge,
                    JSQEX_partner: a.JSQEX_partner,
                    JSQEX_reversed: a.JSQEX_reversed
                }
            }
        };
        c(a.JSQEX_CoEdge);
        a.JSQEX_CoEdge && c(a.JSQEX_CoEdge.JSQEX_partner);
        b[a.JSQEX_From.ID] || JSQEXUtilities.JSQEX_Transaction.JSQEX_savePointToData(a.JSQEX_From, b);
        b[a.JSQEX_To.ID] || JSQEXUtilities.JSQEX_Transaction.JSQEX_savePointToData(a.JSQEX_To, b);
    }
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreRoomsFromData = function(a, b, c, d) {
    var e = c || {
        JSQEX_created: {},
        JSQEX_removed: {},
        JSQEX_changed: {}
    };
    c = function(a) {
        var c = b[a.ID].JSQEX_root;
        a.JSQEX_root !== c && (a.JSQEX_root = c,
            e.JSQEX_changed[a.ID] = a)
    }
    ;
    a.JSQEX_forEachRoom(function(a) {
        if (!b[a.ID]) {
            var c = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]];
            c && (c.JSQEX_removeChild(a.ID),
                e.JSQEX_removed[a.ID] = {
                    JSQEX_parents: [c],
                    JSQEX_child: a
                })
        }
    });
    for (var f = Object.keys(b), g = 0; g < f.length; g++) {
        var h = b[f[g]].JSQEX_entity;
        h && "JSQEXBasicStructure.JSQEX_Room" === h.JSQEX_Class && (c(h),
            a.JSQEX_children[h.ID] || (a.JSQEX_addChild(h, !1),
            e.JSQEX_created[h.ID] = {
                JSQEX_parents: [a],
                JSQEX_child: h
            }))
    }
    !1 !==
    d && JSQEXUtilities.JSQEX_Transaction._JSQEX_updateEntities(e)
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_saveWallsToData = function(a, b) {
    a.JSQEX_forEachWall(function(a) {
        a = a.JSQEX_edge;
        b[a.ID] || JSQEXUtilities.JSQEX_Transaction.JSQEX_saveWallToData(a, b)
    })
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_saveFloorplanTop = function(a, b) {
    JSQEXUtilities.JSQEX_Transaction.JSQEX_saveRoomsToData(a, b);
    JSQEXUtilities.JSQEX_Transaction.JSQEX_saveWallsToData(a, b);
    JSQEXUtilities.JSQEX_Transaction.JSQEX_saveContentsToData(a, b)
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreFloorplanTop = function(a, b, c) {
    var d = {
        JSQEX_created: {},
        JSQEX_removed: {},
        JSQEX_changed: {}
    };
    var keys = Object.keys(b);
    for (var g = 0; g < keys.length; g++) {
        var h = b[keys[g]].JSQEX_entity;
        if (h) {
            h.JSQEX_removed = false;
        }
    }
    JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreContentsFromData(a, b, d, !1);
    JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreWallsFromData(a, b, d, !1);
    JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreRoomsFromData(a, b, d, !1);
    !1 !== c && JSQEXUtilities.JSQEX_Transaction._JSQEX_updateEntities(d)
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreWallsFromData = function(a, b, c, d) {
    var e = c || {
            JSQEX_created: {},
            JSQEX_removed: {},
            JSQEX_changed: {}
        }, f = function(a) {
            var b = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]];
            b && a && (a.JSQEX_partner && a.JSQEX_partner.JSQEX_isValid() && (e.JSQEX_changed[a.JSQEX_partner.ID] = a.JSQEX_partner),
                a.JSQEX_next = void 0,
                a.JSQEX_prev = void 0,
                b.JSQEX_removeChild(a.ID),
                e.JSQEX_removed[a.ID] = {
                    JSQEX_parents: [b],
                    JSQEX_child: a
                },
                e.JSQEX_changed[b.ID] = b)
        }
        , g;
    for (g in a.JSQEX_walls) {
        var h = a.JSQEX_walls[g];
        b[g] || f(h)
    }
    a.JSQEX_forEachRoom(function(a) {
        for (var c in a.JSQEX_children) {
            var d = a.JSQEX_children[c];
            d instanceof JSQEXBasicStructure.JSQEX_CWall && !b[d.ID] &&
            f(d)
        }
    });
    a = Object.keys(b);
    for (g = 0; g < a.length; g++) {
        h = b[a[g]].JSQEX_entity;
        if ( h ) {
            //h.JSQEX_removed = false;
            "JSQEXBasicStructure.JSQEX_Wall" === h.JSQEX_Class && JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreWallFromData(h, b, c, !1);
        }
    }
    !1 !== d && JSQEXUtilities.JSQEX_Transaction._JSQEX_updateEntities(e)
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_saveContentsToData = function(a, b) {
    if ( a instanceof JSQEXBasicStructure.JSQEX_FloorPlan ) {
        a.JSQEX_forEachRoom( function( room ) {
            Object.keys( room.JSQEX_contents).forEach( function(id) {
                JSQEXUtilities.JSQEX_Transaction.JSQEX_saveContentToData( room.JSQEX_contents[id], b);
            } )
        } )
    }
    else if ( a instanceof JSQEXBasicStructure.JSQEX_Room ) {
        Object.keys( a.JSQEX_contents).forEach( function(id) {
            JSQEXUtilities.JSQEX_Transaction.JSQEX_saveContentToData( a.JSQEX_contents[id], b);
        } )
    }
    else if ( a instanceof JSQEXBasicStructure.JSQEX_CWall ) {
        Object.keys( a.JSQEX_edge.JSQEX_embedFurns ).forEach( function(id) {
            JSQEXUtilities.JSQEX_Transaction.JSQEX_saveContentToData( a.JSQEX_edge.JSQEX_embedFurns[id], b);
        } )
    }
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_saveContentToData = function( a, b ) {
    b[a.id] = {};
    b[a.id].position = (new THREE.Vector3).copy( a.position );
    b[a.id].rotation = (new THREE.Vector3).set( a.rotation.x, a.rotation.y, a.rotation.z );
//    if (a.graphID !== undefined ) {
//        b[a.id].graphID = a.graphID;
//    }
//    else if (a.myParent !== undefined ) {
//        b[a.id].graphID = a.myParent;
//    }
    if ( a instanceof THREE.Mesh ) b[a.id].JSQEX_data = a.JSQEX_dump();

};

JSQEXUtilities.JSQEX_Transaction.JSQEX_saveRoomsToData = function( a, b ) {
    a.JSQEX_forEachRoom(function(c) {
        b[c.ID] || (b[c.ID] = {
            JSQEX_entity: c,
            JSQEX_parent: a,
            JSQEX_root: c.JSQEX_root
        })
    })
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreContentsFromData = function(a, b, c, d) {
    var e = c || {
        JSQEX_created: {},
        JSQEX_removed: {},
        JSQEX_changed: {}
    };
    a.JSQEX_forEachContent(function(c) {
        b[c.id] || (( c instanceof THREE.Mesh ) && c.JSQEX_dispose(),
            e.JSQEX_removed[c.id] = {
                JSQEX_parents: [a],
                JSQEX_child: c
            })
    });

    var furns = [], attplanes = [], parquets = [], corePlanes = [];


    for (var f = Object.keys(b), g = 0, h = f.length; g < h; g++) {
        var m = b[f[g]].JSQEX_data;
        if ( m && m[0] ) {
            if ( m[0].isFurn )
                furns.push( m[0] );
            else if ( m[0].isAttPlane )
                attplanes.push( m[0] );
            else if ( m[0].isParquet )
                parquets.push( m[0] );
            else if ( m[0].JSQEX_isCorePlane )
                corePlanes.push( m[0] );
        }
    }

    JSQEXBasicStructure.JSQEX_restoreAttPlaneFromData(attplanes);
    JSQEXBasicStructure.JSQEX_restoreParquetFromData(parquets);
    JSQEXBasicStructure.JSQEX_restoreCorePlaneFromData(corePlanes);
    JSQEXBasicStructure.JSQEX_restoreFurnFromData(furns);


    //var mf = Engine.mainInterface;
    //mf.addFurnFromData( furns );
    //!1 !== d && hsw.util.Transaction._updateEntities(e)
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_restorePointFromData = function(a, b, c, d) {
    b = b[a.ID];
    var e = c || {
        JSQEX_created: {},
        JSQEX_removed: {},
        JSQEX_changed: {}
    };
    a.JSQEX_removed = false;
    a.JSQEX_hided = b.JSQEX_hided;
    a.JSQEX_canEdit = b.JSQEX_canEdit;
    a.JSQEX_canSelect = b.JSQEX_canSelect;
    a.JSQEX_onEntityDirty();
    c = function(a, b) {
        a || (a = 0);
        b || (b = 0);
        return JSQEXMathematics.JSQEX_nearlyEquals(a, b)
    }
    ;
    c(a.x, b.x) && c(a.y, b.y) && c(a.z, b.z) || (e.JSQEX_changed[a.ID] = a,
        a.x = b.x,
        a.y = b.y,
        a.z = b.z);
    var f = b.JSQEX_parents;
    f && f.forEach(function(b) {
        b && !b.JSQEX_children[a.ID] && (b.JSQEX_addChild(a, !1),
            e.JSQEX_created[a.ID] = {
                JSQEX_child: a,
                JSQEX_parents: f
            },
            e.JSQEX_changed[b.ID] = b)
    });
    !1 !== d && JSQEXUtilities.JSQEX_Transaction._JSQEX_updateEntities(e)
};

JSQEXUtilities.JSQEX_Transaction.JSQEX_restoreWallFromData = function(a, b, c, d) {
    if (a && b[a.ID]) {
        //a.JSQEX_removed = false;
        var e = c || {
                JSQEX_created: {},
                JSQEX_removed: {},
                JSQEX_changed: {}
            }
            , f = b[a.ID];
        a.JSQEX_hided = b.JSQEX_hided;
        a.JSQEX_canEdit = b.JSQEX_canEdit;
        a.JSQEX_canSelect = b.JSQEX_canSelect;
        a.JSQEX_From !== f.JSQEX_From && (a.JSQEX_From = f.JSQEX_From);
        a.JSQEX_To !== f.JSQEX_To && (a.JSQEX_To = f.JSQEX_To);
        a.JSQEX_height3d !== f.JSQEX_height3d && (a.JSQEX_height3d = f.JSQEX_height3d);
        a.JSQEX_CoEdge = f.JSQEX_CoEdge;
        a.JSQEX_CoEdge.JSQEX_removed = false;
        f = function(a) {
            if (a) {
                var c = b[a.ID];
                a.JSQEX_prev !== c.JSQEX_prev && (a.JSQEX_prev = c.JSQEX_prev,
                    e.JSQEX_changed[a.ID] = a);
                a.JSQEX_next !== c.JSQEX_next && (a.JSQEX_next = c.JSQEX_next,
                    e.JSQEX_changed[a.ID] = a);
                var d = c.JSQEX_parent
                    , f = a.JSQEX_parents[Object.keys(a.JSQEX_parents)[0]];
                f && f !== d && (f.JSQEX_removeChild(a.ID, !1),
                    e.JSQEX_changed[f.ID] = f);
                d && (d.JSQEX_children[a.ID] || ( a.JSQEX_removed = false, d.JSQEX_addChild(a, !1),
                    e.JSQEX_created[a.ID] = {
                        JSQEX_parents: [d],
                        JSQEX_child: a
                    }),
                    e.JSQEX_changed[d.ID] = d);
                a.reversed = c.reversed;
                a.JSQEX_partner = c.JSQEX_partner;
                a.JSQEX_edge = c.JSQEX_edge
            }
        }
        ;
        f(a.JSQEX_CoEdge);
        f(a.JSQEX_CoEdge.JSQEX_partner);
        b[a.JSQEX_From.ID] && JSQEXUtilities.JSQEX_Transaction.JSQEX_restorePointFromData(a.JSQEX_From, b, c, !1);
        b[a.JSQEX_To.ID] && JSQEXUtilities.JSQEX_Transaction.JSQEX_restorePointFromData(a.JSQEX_To, b, c, !1);
        !1 !== d && JSQEXUtilities.JSQEX_Transaction._JSQEX_updateEntities(e)
    }
};

JSQEXUtilities.JSQEX_Transaction._JSQEX_updateEntities = function(a) {
    if (a) {
        var b = function(a, b) {
                return a.JSQEX_child.ID - b.JSQEX_child.ID
            }
            , c = [], d;
        for (d in a.JSQEX_created) {
            var e = a.JSQEX_created[d];
            e.JSQEX_removed = false;
            c.push(e)
        }
        c.sort(b);
        c.forEach(function(a) {
            var b = a.JSQEX_child;
            a.JSQEX_parents.forEach(function(a) {
                if ( a instanceof JSQEXBasicStructure.BasicStructure ) a.JSQEX_onEntityDirty();
            })
        });
        c = [];
        for (d in a.JSQEX_removed)
            e = a.JSQEX_removed[d],
                c.push(e);
        c.sort(b);
        c.reverse();
        c.forEach(function(a) {
            var b = a.JSQEX_child;
            b.JSQEX_onEntityDirty();
            a.JSQEX_parents.forEach(function(a) {
                if ( a instanceof JSQEXBasicStructure.BasicStructure ) a.JSQEX_onEntityDirty();
            })
        });
        b = [];
        for (d in a.JSQEX_changed)
            e = a.JSQEX_changed[d],
                b.push(e);
        b.sort(function(a, b) {
            return b.ID - a.ID
        });
        b.forEach(function(a) {
            a.JSQEX_onEntityDirty()
        })
    }
};

// JSQ.MainInterface.prototype.JSQEX_GeoManager = new JSQEXBasicStructure.JSQEX_GeometryManager();

// JSQ.MainInterface.prototype.JSQEX_structureInfos = new JSQEXBasicStructure.JSQEX_FloorPlan();

// JSQ.MainInterface.prototype.JSQEX_createHoleMesh = function( data ) {
// //    var pos = new THREE.Vector3();

// //    if ( JSQEXMathematics.JSQEX_nearlyEquals( vs[0].x, vs[vs.length-1].x ) &&
// //        JSQEXMathematics.JSQEX_nearlyEquals( vs[0].y, vs[vs.length-1].y ) &&
// //        JSQEXMathematics.JSQEX_nearlyEquals( vs[0].z, vs[vs.length-1].z )) vs.splice( vs.length - 1, 1 );

// //    var ruledPoints = [];
// //    var count = 0;
// //    var cmpInd = -1;
// //    for ( var i = 0; i < vs.length; i++ ) {
// //        cmpInd = cmpInd > -1 ? cmpInd : JSQEX_getPre( vs, i );
// //        if ( JSQEXMathematics.JSQEX_nearlyEquals( vs[i].x, vs[cmpInd].x, 0.1 ) &&
// //            JSQEXMathematics.JSQEX_nearlyEquals( vs[i].y, vs[cmpInd].y, 0.1 ) &&
// //            JSQEXMathematics.JSQEX_nearlyEquals( vs[i].z, vs[cmpInd].z, 0.1 )) continue;
// //        ruledPoints.push( vs[i] );
// //        pos.x += vs[i].x;
// //        pos.y += vs[i].y;
// //        pos.z += vs[i].z;
// //        cmpInd = i;
// //        count++;
// //    }
// //
// //    pos.x /= count;
// //    pos.y /= count;
// //    pos.z /= count;
//     var vs = data.vertices;
//     var param = JSQEX_reducePoints( vs, 0.2 );


//     var holeMesh = new THREE.Mesh();
//     holeMesh.position = param.JSQEX_position;
//     holeMesh.JSQEX_path = param.JSQEX_points;
//     holeMesh.JSQEX_nodes = data.nodes;
//     holeMesh.JSQEX_nodes && ( holeMesh.JSQEX_nodes.id = holeMesh.id );
//     holeMesh.JSQEX_shape = data.shape;

// //    var room = this.JSQEX_getParentRoom();
// //    holeMesh.myParent = room ? room.ID : -1;
//     holeMesh.isHole = true;
//     return holeMesh;
// };

// JSQ.MainInterface.prototype.JSQEX_setDefaultMoldMeta = function(JSQEX_moldingType) {
//     var JSQEX_productMetas = {};
//     if ( JSQEX_moldingType == JSQEXBasicStructure.JSQEX_MoldingTypeEnum.JSQEX_Cornice ) JSQEX_productMetas = {JSQEX_profile: [
//         new THREE.Vector2( 0, -1 ),
//         new THREE.Vector2( 0.5, -1 ),
//         new THREE.Vector2( 0.5, -0.5 ),
//         new THREE.Vector2( 1, -0.5 ),
//         new THREE.Vector2( 1, 0 ),
//         new THREE.Vector2( 0, 0 )
//     ]};
//     else {
//         JSQEX_productMetas = {JSQEX_profile: [
//             new THREE.Vector2( 0, 0 ),
//             new THREE.Vector2( 0.2, 0 ),
//             new THREE.Vector2( 0.2, 1 ),
//             new THREE.Vector2( 0, 1 )
//         ]};
//     }
//     JSQEX_productMetas.JSQEX_isClose = true;
//     JSQEX_productMetas.JSQEX_profile.JSQEX_profileSizeX = 1;
//     JSQEX_productMetas.JSQEX_profile.JSQEX_profileSizeY = 1;
//     JSQEX_productMetas.JSQEX_mapSrc = { src: [ "textures/walls/tile/ceil.jpg", "textures/walls/tile/squareNormal1.jpg" ],
//     size: new THREE.Vector2(6, 6)};

//     return JSQEX_productMetas;
// };

var container = document.getElementById( "container" );

window.addEventListener( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_NeedUpdate, function ( event ) {
    var obj = event.data.JSQEX_EventObj;
    if ( obj && ( obj.mainObj instanceof JSQEXBasicStructure.BasicStructure ) && !obj.mainObj.JSQEX_removed ) {
        if ( obj.mainObj instanceof JSQEXBasicStructure.JSQEX_Room )
            JSQEXBasicStructure.JSQEX_waitRoomUpdateQueue[obj.mainObj.ID] = obj.mainObj;
        else if ( obj.mainObj instanceof JSQEXBasicStructure.JSQEX_Molding )
            JSQEXBasicStructure.JSQEX_waitContentUpdateQueue[obj.mainObj.ID] = obj.mainObj;
        else if ( obj.mainObj instanceof JSQEXBasicStructure.JSQEX_Plank )
            JSQEXBasicStructure.JSQEX_waitPlankUpdateQueue[obj.mainObj.ID] = obj.mainObj;
        else JSQEXBasicStructure.JSQEX_waitWallUpdateQueue[obj.mainObj.ID] = obj.mainObj;
    }
    else if ( obj && ( obj.mainObj instanceof THREE.Mesh ) )
        JSQEXBasicStructure.JSQEX_waitContentUpdateQueue[obj.mainObj.id] = obj.mainObj;

}, false );

window.addEventListener( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_ChildRemoved, function ( event ) {
    var obj = event.data.JSQEX_EventObj;
    if ( obj && ( obj.mainObj instanceof JSQEXBasicStructure.BasicStructure ) ) {
        //delete Engine.mainInterface.JSQEX_AllEntities[ obj.mainObj.ID ];
        if ( obj.mainObj instanceof JSQEXBasicStructure.JSQEX_Room )
            delete JSQEXBasicStructure.JSQEX_waitRoomUpdateQueue[obj.mainObj.ID];
        else if ( obj.mainObj instanceof JSQEXBasicStructure.JSQEX_Molding )
            delete JSQEXBasicStructure.JSQEX_waitContentUpdateQueue[obj.mainObj.ID];
        else if ( obj.mainObj instanceof JSQEXBasicStructure.JSQEX_Plank )
            delete JSQEXBasicStructure.JSQEX_waitPlankUpdateQueue[obj.mainObj.ID];
        else delete JSQEXBasicStructure.JSQEX_waitWallUpdateQueue[obj.mainObj.ID];
        if ( obj.mainObj instanceof JSQEXBasicStructure.JSQEX_CEdge )
            delete Engine.mainInterface.JSQEX_structureInfos[obj.mainObj.ID];
        obj.mainObj.JSQEX_dispose();
    }
    //console.log( "delete obj" )
}, false );

window.addEventListener( JSQEXUtilities.JSQEX_Flags.JSQEX_StructureEventFlag.JSQEX_StartDrawQueue, function ( event ) {
    var param = event.data.JSQEX_EventObj ? event.data.JSQEX_EventObj : {};
    Object.keys( JSQEXBasicStructure.JSQEX_waitWallUpdateQueue ).forEach( function(a) {
        if ( JSQEXBasicStructure.JSQEX_waitWallUpdateQueue[ a ] )
            JSQEXBasicStructure.JSQEX_waitWallUpdateQueue[ a ].JSQEX_draw( param.JSQEX_clearCache, param.JSQEX_updateMat, param.JSQEX_ignoreHole );
        //JSQEXBasicStructure.JSQEX_waitWallUpdateQueue[ a ]._JSQEX_boundDirty = false;
    });
    JSQEXBasicStructure.JSQEX_waitWallUpdateQueue = {};

    Object.keys( JSQEXBasicStructure.JSQEX_waitRoomUpdateQueue ).forEach( function(a) {
        var room = JSQEXBasicStructure.JSQEX_waitRoomUpdateQueue[ a ];
        if ( room ) {
            room.JSQEX_draw(param.JSQEX_clearCache, param.JSQEX_updateMat);
            if ( param.JSQEX_updateMat ) Engine.interfaceController.JSQEX_dispatchCeilEvent(room);
        }
        //JSQEXBasicStructure.JSQEX_waitRoomUpdateQueue[ a ]._JSQEX_boundDirty = false;
    });
    JSQEXBasicStructure.JSQEX_waitRoomUpdateQueue = {};

    Object.keys( JSQEXBasicStructure.JSQEX_waitContentUpdateQueue ).forEach( function(a) {
        if ( JSQEXBasicStructure.JSQEX_waitContentUpdateQueue[ a ] )
            JSQEXBasicStructure.JSQEX_waitContentUpdateQueue[ a ].JSQEX_draw();
        //JSQEXBasicStructure.JSQEX_waitContentUpdateQueue[ a ]._JSQEX_boundDirty = false;
    });
    JSQEXBasicStructure.JSQEX_waitContentUpdateQueue = {};

    Object.keys( JSQEXBasicStructure.JSQEX_waitPlankUpdateQueue ).forEach( function(a) {
        if ( JSQEXBasicStructure.JSQEX_waitPlankUpdateQueue[ a ] )
            JSQEXBasicStructure.JSQEX_waitPlankUpdateQueue[ a ].JSQEX_draw();
        //JSQEXBasicStructure.JSQEX_waitContentUpdateQueue[ a ]._JSQEX_boundDirty = false;
    });
    JSQEXBasicStructure.JSQEX_waitPlankUpdateQueue = {};

    Engine.needUpdate3D = true;
    if ( param.JSQEX_callback && param.JSQEX_data ) {
        setTimeout( function() {
            param.JSQEX_callback( param.JSQEX_data );

        }, 500 );

    }

}, false );