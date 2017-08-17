JSQEXCommands = {};


JSQEXCommands.JSQEX_StairEditor = function(stair,domElement) {
    this.JSQEX_stair = stair;
    this._domElement=domElement;
    this._selected = null, this._hovered = null;
    this._plane = new THREE.Plane(new THREE.Vector3(0,1,0),0);
    this._planeheight = new THREE.Plane(new THREE.Vector3(0,0,1),5000);
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();
    this.initial_position = new THREE.Vector3();
    this._intersection = new THREE.Vector3();
    this.enabled=true;
    this.canchange1=true,this.canchange2=true;
    this.surechange=false;
    this.candraw=false;
    this.candrawheight=false;
    this.candrawwidth=false;
    this.point1=new THREE.Vector3();
    this.point2=new THREE.Vector3();
    this.point3=new THREE.Vector3();
    this.point4=new THREE.Vector3();
};
JSQEXCommands.JSQEX_StairEditor.prototype.activate=function() {
    this._domElement.addEventListener( 'mousemove', this.JSQEX_onMouseMove.bind(this), false );//this.JSQEX_onMouseMove.bind(this)将绑定对象指向为JSQEXCommands.JSQEX_StairEditor对象，默认是指向this._domElement对象
    this._domElement.addEventListener( 'mousedown', this.JSQEX_onMouseDown.bind(this), false );
    this._domElement.addEventListener( 'mouseup', this.JSQEX_onMouseUp.bind(this), false );
}

JSQEXCommands.JSQEX_StairEditor.prototype.deactivate=function() {
    this._domElement.removeEventListener( 'mousemove', this.JSQEX_onMouseMove.bind(this), false );
    this._domElement.removeEventListener( 'mousedown', this.JSQEX_onMouseDown.bind(this), false );
    this._domElement.removeEventListener( 'mouseup', this.JSQEX_onMouseUp.bind(this), false );
}
JSQEXCommands.JSQEX_StairEditor.prototype.dispose=function(){
    this.deactivate();
}
JSQEXCommands.JSQEX_StairEditor.prototype.JSQEX_onExecute = function(json) {//初始化
    this.JSQEX_caneditor=true;
    // this.JSQEX_stair.JSQEX_Calculationvertex(this.JSQEX_stair.JSQEX_points,this.JSQEX_stair.JSQEX_segmentInfo);
    // this.JSQEX_stair.JSQEX_addAnchor();
    this.activate();   
};

JSQEXCommands.JSQEX_StairEditor.prototype.JSQEX_onUndo = function() {//回撤
    this.JSQEX_stair.JSQEX_restoreMesh(-1)
};

JSQEXCommands.JSQEX_StairEditor.prototype.JSQEX_onRedo = function() {//前进
    this.JSQEX_stair.JSQEX_restoreMesh(1)
};

JSQEXCommands.JSQEX_StairEditor.prototype.JSQEX_onMouseUp = function(event) {
    if(!this.enabled)  return;
    event.preventDefault();
    if(this.JSQEX_stair.object_type.spiraltype){//螺旋楼梯
        if(this.candraw){
            this.candrawheight=true;
            this.candraw=false;
            this.initial_position.copy(this._intersection);//重置初始位置 防止mouseup时 绘制高度值
        }else{
            this.candrawheight=false;
            this.enabled=false;
            controls.enabled=true;

        }
    }else if(this.JSQEX_stair.object_type.beelinetype){
        if(this.candrawheight){
            this.candrawheight=false;
            this.enabled=false;
            controls.enabled=true;
        }
        if(this.candrawwidth){
            this.candrawheight=true;
            this.candrawwidth=false;
            this.initial_position.copy(this._intersection);//重置初始位置 防止mouseup时 绘制高度值
        }
        if(this.candraw){
            this.candrawwidth=true;
            this.candraw=false;
            this.initial_position.copy(this._intersection);//重置初始位置 防止mouseup时 绘制宽度值
        }
    }else if(this.JSQEX_stair.object_type.utype){//U型楼梯
        if(this.candrawheight){
            this.candrawheight=false;
            this.enabled=false;
            controls.enabled=true;
        }
        if(this.candrawwidth){
            this.candrawheight=true;
            this.candrawwidth=false;
            this.initial_position.copy(this._intersection);//重置初始位置 防止mouseup时 绘制高度值
        }
        if(this.candraw){
            this.candrawwidth=true;
            this.candraw=false;
            this.initial_position.copy(this._intersection);//重置初始位置 防止mouseup时 绘制宽度值
        }

    }else{//L型楼梯
        if(this.candrawheight){
            this.candrawheight=false;
            this.enabled=false;
            controls.enabled=true;
        }
        if(this.candrawwidth){
            this.candrawheight=true;
            this.candrawwidth=false;
            this.initial_position.copy(this._intersection);//重置初始位置 防止mouseup时 绘制高度值
        }
        if(this.candraw){
            this.candrawwidth=true;
            this.candraw=false;
            this.initial_position.copy(this._intersection);//重置初始位置 防止mouseup时 绘制宽度值
        }

    }
    
};

JSQEXCommands.JSQEX_StairEditor.prototype.JSQEX_onMouseDown = function(event) {
    if(!this.enabled)  return;
	event.preventDefault();
    controls.enabled=false;
    if(!this.JSQEX_caneditor) return;
    this.JSQEX_stair.JSQEX_mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.JSQEX_stair.JSQEX_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this._raycaster.setFromCamera(this.JSQEX_stair.JSQEX_mouse, camera );
    if(this._raycaster.ray.direction.y*this._raycaster.ray.origin.y>0){
        console.log("无交点")
        this._raycaster.ray.direction.multiplyScalar(-1);//兼容射线方向y分量小于0，且射线原点位置y分量小于0 情况下获取不到交点的情况
    }
    var _point=this._raycaster.ray.intersectPlane( this._plane);
    if(this.JSQEX_stair.object_type.spiraltype){//螺旋楼梯
        if(!this.candrawheight){
            //防止高度绘制完 更改中心位置
            this.JSQEX_stair.JSQEX_obj.center=_point;
            this.initial_position.copy( this.JSQEX_stair.JSQEX_obj.center );
            this.candraw=true;
        }
    }else if(this.JSQEX_stair.object_type.beelinetype){//直线楼梯
         if(!this.candrawwidth&&!this.candrawheight){
            //防止绘制宽度，高度时 更改point1的值
            this._raycaster.setFromCamera(this.JSQEX_stair.JSQEX_mouse, camera );
            this.JSQEX_stair.JSQEX_obj.point1=_point;
            this.initial_position.copy( this.JSQEX_stair.JSQEX_obj.point1 );
            this.candraw=true;
        }
    }else if(this.JSQEX_stair.object_type.utype){//U型楼梯
        if(!this.candrawwidth&&!this.candrawheight){
            //防止绘制宽度，高度时 更改point1的值
            this._raycaster.setFromCamera(this.JSQEX_stair.JSQEX_mouse, camera );
            this.JSQEX_stair.JSQEX_obj.point2=_point.clone();
            this.JSQEX_stair.JSQEX_obj.point3=_point.clone();
            this.JSQEX_stair.JSQEX_obj.point4=_point.clone();
            this.JSQEX_stair.JSQEX_obj.point1=_point.clone();
            this.candraw=true;
        }
    }else{//L型楼梯
        if(!this.candrawwidth&&!this.candrawheight){
            //防止绘制宽度，高度时 更改point1的值
            this._raycaster.setFromCamera(this.JSQEX_stair.JSQEX_mouse, camera );
            this.JSQEX_stair.JSQEX_obj.point1=_point;
            this.initial_position.copy( this.JSQEX_stair.JSQEX_obj.point1 );
            this.candraw=true;
        }
    }   
};

JSQEXCommands.JSQEX_StairEditor.prototype.JSQEX_onMouseMove = function(event) {
    if(!this.enabled)  return;
    event.preventDefault();
    this.JSQEX_stair.JSQEX_mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.JSQEX_stair.JSQEX_mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this._raycaster.setFromCamera(this.JSQEX_stair.JSQEX_mouse, camera );
    if(this._raycaster.ray.direction.y*this._raycaster.ray.origin.y>0){
        this._raycaster.ray.direction.multiplyScalar(-1);//兼容射线方向y分量小于0，且射线原点位置y分量小于0 情况下获取不到交点的情况
    }
    if(this.JSQEX_stair.object_type.spiraltype){//螺旋楼梯
        if(this.candraw){
            this._raycaster.ray.intersectPlane( this._plane, this._intersection );
            var pyposition=new THREE.Vector3().copy(this._intersection.clone().sub( this.initial_position ));
                var sin1=-Math.atan2(pyposition.z,pyposition.x);
                this.JSQEX_stair.JSQEX_obj.aStartAngle=sin1;
                this.JSQEX_stair.JSQEX_obj.aEndAngle=sin1+Math.PI*0.75;
            if(pyposition.length()<=700){
                this.JSQEX_stair.JSQEX_obj.layout.radius=pyposition.length()/2;
                this.JSQEX_stair.JSQEX_obj.layout.width=pyposition.length()/2;
                this.JSQEX_stair.JSQEX_obj.step.height=0;
                
            }
            if(pyposition.length()>700){
                this.JSQEX_stair.JSQEX_obj.layout.radius=pyposition.length()-300;
                this.JSQEX_stair.JSQEX_obj.layout.width=400;
                this.JSQEX_stair.JSQEX_obj.step.height=0;
            }
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        }
        if(this.candrawheight){
            this._raycaster.ray.intersectPlane( this._plane, this._intersection );
            var ver2=this._intersection.clone().sub( this.initial_position );
            var pyposition=new THREE.Vector3(ver2.x,0,ver2.z);
            this.JSQEX_stair.JSQEX_obj.step.height=pyposition.length();
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        }
    }else if(this.JSQEX_stair.object_type.beelinetype){//直线楼梯
        var ver1=new THREE.Vector3().subVectors(this.JSQEX_stair.JSQEX_obj.point1,this.JSQEX_stair.JSQEX_obj.point2);
        this._raycaster.ray.intersectPlane( this._plane, this._intersection );
        if(this.candraw){
            this.JSQEX_stair.JSQEX_obj.point2=this._raycaster.ray.intersectPlane( this._plane);
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        }
        if(this.candrawwidth){
            var ver2=this._intersection.clone().sub( this.initial_position );
            var pyposition=ver1.clone().cross(ver2).length()/ver1.length();
            this.JSQEX_stair.JSQEX_obj.layout.width=pyposition*2;
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair();
        } 
        if(this.candrawheight){
            var ver2=this._intersection.clone().sub( this.initial_position );
            var pyposition=ver1.clone().dot(ver2)/ver1.length();
            this.JSQEX_stair.JSQEX_obj.step.height=-pyposition;
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        } 
    }else if(this.JSQEX_stair.object_type.utype){//U型楼梯
        var ver1=new THREE.Vector3().subVectors(this.JSQEX_stair.JSQEX_obj.point1,this.JSQEX_stair.JSQEX_obj.point2);
        this._raycaster.ray.intersectPlane( this._plane, this._intersection );
        if(this.candraw){
            this.JSQEX_stair.JSQEX_obj.point2=this._raycaster.ray.intersectPlane( this._plane);
            this.JSQEX_stair.JSQEX_obj.point3=this._raycaster.ray.intersectPlane( this._plane);
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        }
        if(this.candrawwidth){
            var ver2=this._intersection.clone().sub( this.initial_position );
            var _pd=ver1.clone().cross(ver2);
            this.JSQEX_stair.JSQEX_obj.pdnum=_pd.y>0?1:-1;
            var pyposition=_pd.length()/ver1.length();
            this.JSQEX_stair.JSQEX_obj.layout.width=pyposition/3*2;
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair();
        } 
        if(this.candrawheight){
            var ver2=this._intersection.clone().sub( this.initial_position );
            var pyposition=ver1.clone().dot(ver2)/ver1.length();
            this.JSQEX_stair.JSQEX_obj.step.height=-pyposition;
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        } 

    }else{//L型楼梯 
        var ver1=new THREE.Vector3().subVectors(this.JSQEX_stair.JSQEX_obj.point1,this.JSQEX_stair.JSQEX_obj.point2);
        this._raycaster.ray.intersectPlane( this._plane, this._intersection );
        if(this.candraw){
            this.JSQEX_stair.JSQEX_obj.point2=this._raycaster.ray.intersectPlane( this._plane);
            this.JSQEX_stair.JSQEX_obj.layout.length1=new THREE.Vector3(this.JSQEX_stair.JSQEX_obj.point2,this.JSQEX_stair.JSQEX_obj.point1).length();
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        }
        if(this.candrawwidth){
            var ver2=this._intersection.clone().sub( this.initial_position );
            var _pd=ver1.clone().cross(ver2);
            this.JSQEX_stair.JSQEX_obj.layout.angle=_pd.y>0?90:-90;
            var pyposition=_pd.length()/ver1.length();
            this.JSQEX_stair.JSQEX_obj.layout.length2=pyposition-this.JSQEX_stair.JSQEX_obj.layout.width;
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair();
        } 
        if(this.candrawheight){
            var ver2=this._intersection.clone().sub( this.initial_position );
            var pyposition=ver1.clone().dot(ver2)/ver1.length();
            this.JSQEX_stair.JSQEX_obj.step.height=-pyposition;
            this.JSQEX_stair.JSQEX_obj.JSQEX_changeSpiralstair()
        } 
    }   
};
