//Walk sequence animation
//Art work by "TheZakMan" at OpenGameArt.org
//http://opengameart.org/content/plataform-walk-jump-animation-side-view
//Licenced under CC-BY 3.0 license

//to use images in pjs, they must be listed in a preload comment
//like that below
/*@pjs preload="images/catL.png,
				images/catR.png,
				images/layout_L.png,
				images/pumpkin.png,
				images/pumpkin.png,
				images/pumpkin2.png,
				images/pumpkin3.png,
				images/boom.png"; */

class Line{
	int _x1, _y1, _x2, _y2;
	float len;

	Line(int x1, int y1, int x2, int y2){
		_x1 = x1;
		_y1 = y1;
		_x2 = x2;
		_y2 = y2;
		//len = l;
	}

	void draw(){
		line(_x1,_y1,_x2,_y2);
	}
}

Line [] lineList = new Line[50];

int numLines = 0;
PImage [] cat = new PImage[2];
PImage [] pumpk = new PImage[20];
PImage [] pumkL = new PImage[1];
PImage [] pimkR = new PImage[1];
PImage [] boom = new PImage[1];
int seq = 0;
int posX;
void setup(){
	size(800,540);
	//for(int o=0;i<2;i++){
	cat = loadImage("images/layout_L.png");
	//for(int i = 0;i<19;i++){
	//	pumpk[i] = loadImage("images/pumpkin"+i+".png");
	pumpk[0] = loadImage("images/pumpkin.png");
	pumpk[1] = loadImage("images/pumpkin.png");
	pumpk[2] = loadImage("images/pumpkin.png");

	boom = loadImage("images/boom.png");
	//pumkL = loadImage("images/pumpkin2.png");
	//pumkR = new
	
	//}
	//imageMode(CENTER);
	//posX = 0;
}
bool gameover = false;
bool pumExist = true;
bool pumExistLeft = true;
bool pumExistRight = true;

int myColor = 255;
int health = 100;
int score = 0;
bool fire = false;

int level = 1;
int levelSpeed = 5;
int levelUp = 100;
int pumX = 390; //center route
int pumY = 480; //center route

int pumXL = 70; //left route
int pumYL = 440; //left route

int pumXR = 610; //right route
int pumYR = 450; //right route

void draw(){
	background(0);
	//fill(215,215,0);
	//ellipse(30, 30, 40, 40);
	//background(26, 0, 51);
	
	
	//tint(100);
	image(cat,0,0);
	//if()
	//while(gameover == false){
		if(pumExist == true){
			for(int i = 0;i<225 && pumY > 300;i++){
				frameRate(levelSpeed);
				image(pumpk[0],pumX,pumY,60,60);
			}
			pumY--;
		}else{
			//text("Blow!",pumX,pumY);
			if(score > levelUp){
				levelUp+=100;
				level++;
				levelSpeed+=5;
				frameRate(levelSpeed);
			}
			score+=10;
			pumExist = true;
			frameRate(levelSpeed);
			image(boom,pumX,pumY,100,100);
			image(boom,pumX,pumY,100,100);
			image(boom,pumX,pumY,100,100);
			pumX = 390;
			pumY = 480;
			//frameRate(60);
		}
	//}
	
	//LEFT PUMPKIN

	if(pumExistLeft == true){
			for(int i = 0;i<225 && pumYL > 300;i++){
				frameRate(levelSpeed);
				image(pumpk[1],pumXL,pumYL,60,60);
			}
			pumYL--;
			pumXL+=2;
	}else{
			//text("Blow!",pumX,pumY);
			if(score > levelUp){
				levelUp+=100;
				level++;
				levelSpeed+=5;
				frameRate(levelSpeed);
			}
			score+=10;
			pumExistLeft = true;
			frameRate(levelSpeed);
			image(boom,pumXL,pumYL,100,100);
			//ellipse(170,140,15,20);
			pumXL = 70;
			pumYL = 440;
			//frameRate(60);
		}

		//RIGHT PUMPKIN

	if(pumExistRight == true){
			for(int i = 0;i<225 && pumYR > 300;i++){
				frameRate(levelSpeed);
				image(pumpk[2],pumXR,pumYR,60,60);
			}
			pumYR--;
			pumXR--;
		}else{
			//text("Blow!",pumX,pumY);
			if(score > levelUp){
				levelUp+=100;
				level++;
				levelSpeed+=5;
				frameRate(levelSpeed);
			}
			score+=10;
			pumExistRight = true;
			frameRate(levelSpeed);
			image(boom,pumXR,pumYR,100,100);
			
			pumXR = 610;
			pumYR = 450;
			//frameRate(60);
		}
	
	/* REDUCING HEALTH */
	if(pumY == 299){
			health-=10; //reducing health
			pumY = 480;
	}
	if(pumYL == 299){
			health-=10; //reducing health
			pumYL = 440;
			pumXL = 70;
	}
	if(pumYR == 299){
			health-=10; 
			pumYR = 450;
			pumXR = 610;
	}

	seq++;
	//line(0,315,1000,315); //where pumpkin stops
	text("Score: " + score + "",700,40);
	text("Health: " + health + "",700,60);
	text("Level: " + level + "",700,80);
	text("Speed: " + levelSpeed + "",700,100);
	
	//text("pumX: " + pumX + "",700,80);
	//text("pumY: " + pumY + "",700,100);

	if(health <= 0){
		tint(100);
		textSize(44);
		//fill(255,255,0,0);
		text("GAME OVER!!!\nHAPPY HALLOWEEN!!!\nYour score: "+score+"\nLevel: "+level+"",200,200);
	}

}
void changeColor(newColor) {
  myColor = newColor;

}

void mousePressed(){
	if(fire){
		line(0,0,100,100);
	}else{
		frameRate(10);
		stroke(255,0,0);//laser color
		strokeWeight(6);
		//line(380,90,120,450);
		line(380,90,mouseX,mouseY);
		//fill(255,0,0);
		line(435,90,mouseX,mouseY);

		/*if((mouseX >= pumX - 10 && mouseX <= pumX + 10) && (mouseY >= pumY - 10 && mouseY <= pumY + 10)){
			ellipse(170,140,15,20);
		}
		if((mouseX - pumX + 30 < 30) && (mouseY - pumY + 30 < 30) ){
			ellipse(170,140,15,20);
		}*/
		if(dist(mouseX, mouseY, pumX + 30, pumY + 30) < 30){
			//ellipse(170,140,15,20);
			pumExist = false;
		}

		if(dist(mouseX, mouseY, pumXL + 30, pumYL + 30) < 30){
			pumExistLeft = false;
		}

		if(dist(mouseX, mouseY, pumXR + 30, pumYR + 30) < 30){
			pumExistRight = false;
		}
	}
}

/*for(int i=pews.size()-1;i>=0;i--){ 
		pew p = (pew) pews.get(i);
		p.move();
		if(!p.alive)
			pews.remove(i);
		else
			p.draw();
	}
		
	if(beam){
		if(highdetail)
			stroke(random(100,255),random(100,255),random(100,255));
		else
			stroke(0,255,0);

    	if (gamepad) {
        	bx = 10;
        	by = 10;
    	} else {
        	bx=mouseX;
        	by=mouseY;
    	}
  	}
  	*/