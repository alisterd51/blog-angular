import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.css']
})
export class CubeComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  // Cube Properties
  @Input()
  public rotationSpeedX: number = 0.05;
  @Input()
  public rotationSpeedY: number = 0.01;
  @Input()
  public size: number = 200;
  @Input()
  public texture: string = '/assets/texture.jpeg';

  // Stage Properties
  @Input()
  public cameraZ: number = 400;
  @Input()
  public fieldOfView: number = 1;
  @Input('nearClipping')
  public nearClippingPlane: number = 1;
  @Input('farClipping')
  public farClippingPlane: number = 1000;

  // Helper Properties
  private camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({ map: this.loader.load(this.texture) });

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private createScene() {
    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.cube);
    // Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private testX = 0.05;
  private testY = 0.05;
  private testZ = 2;

  private moveCube() {
    if (this.cube.position.x < -5) {
      this.testX = 0.05;
    } else if (this.cube.position.x > 5) {
      this.testX = -0.05;
    }
    if (this.cube.position.y < -2) {
      this.testY = 0.05;
    } else if (this.cube.position.y > 2) {
      this.testY = -0.05;
    }
    if (this.cube.position.z < -150) {
      this.testZ = 2;
    } else if (this.cube.position.z > 150) {
      this.testZ = -2;
    }
    this.cube.position.x += this.testX;
    this.cube.position.y += this.testY;
    this.cube.position.z += this.testZ;
  }

  private startRenderingLoop() {
    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: CubeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.moveCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.createScene();
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(event.target.innerWidth, event.target.innerWidth / 2);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }
}
