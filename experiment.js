let delta=3;
let centro=0.05;//porcentaje de la barra central en relacion al largo del canvas.
let apertura_angulo=4;
let numero_particulas=500;

class Bala{
  constructor(){
    this.x=0;
    this.y= height/2;
    this.angulo= random(PI/apertura_angulo,PI*(1-1/apertura_angulo));
    this.vx=5*sin(this.angulo);
    this.vy=5*cos(this.angulo);
  }
  dibujarParticula(){
    circle(this.x,this.y,10);
  }
  moverParticula(){
    this.x+=this.vx;
    this.y+=this.vy;
    //la barrera superior
    if(this.x>width/2-delta && this.x<width/2+delta  && this.y<height/3){
      this.vx*=-1;
    }
    
    //la barrera inferior
    if(this.x>width/2-delta && this.x<width/2+delta  && this.y>height*2/3){
      this.vx*=-1;
    }
    
    //la barrera central
    if(this.x>width/2-delta && this.x<width/2+delta  && this.y>height*(0.5-centro) && this.y<height*(0.5+centro)){
      this.vx*=-1;
    }
  }
  
  detener(){
    this.vx=0;
    this.vy=0;
  }
  
  
  
}

let particulas = [];
let sum=0;
let resultados=[];
let divisiones=50;
let dist_div=0;

function setup() {
  createCanvas(800, 400);
  for(let i=0;i<divisiones;i++){
    resultados.push(0);
  }
  dist_div=height/divisiones;
}

function draw() {
  //genera las partículas
  if(particulas.length<numero_particulas){
      particulas.push(new Bala());
  }

  background(220);
  for(let i=0;i<particulas.length;i++){
    particulas[i].dibujarParticula();
    particulas[i].moverParticula();  
    
    //cuando las particulas chocan con el detector
    if(particulas[i].x>width*3/4 ){
      particulas[i].detener();
      particulas[i].x=width*3/4-2*delta;
      
      for(let j=0;j<divisiones;j++){
        if(particulas[i].y>j*dist_div  &&particulas[i].y<(j+1)*dist_div){
          resultados[j]++;
        }
      }
    }
    
    //por eficiencia para que no anime las particulas detras del canvas
    if(particulas[i].x<-10 ){
      particulas[i].detener();
    }
  }
  line(width/2,0,width/2,height/3);//barra superior
  line(width/2,height,width/2,height*2/3);//barra de abajo
  line(width/2,height*(0.5-centro),width/2,height*(0.5+centro));//barra central
  line(width*3/4,0,width*3/4,height);//placa detectora

  //plotear los resultados
  
  for(let j=0;j<divisiones;j++){
    line(width*3/4,j*dist_div,width*(3/4)+20*resultados[j],j*dist_div);
  }
}
