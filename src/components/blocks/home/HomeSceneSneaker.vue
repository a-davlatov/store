<script setup>

import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { AmbientLight, DirectionalLight, Mesh, PCFSoftShadowMap, PerspectiveCamera, PlaneGeometry, Scene, ShadowMaterial, WebGLRenderer } from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { onMounted, onUnmounted, ref } from 'vue'

const sceneRef = ref(null)
const loadingStore = useIsLoadingStore()

const scene = new Scene()
let width = null, height = 290
let camera = null

const light = new AmbientLight(0xffffff, 1)
scene.add(light)

const directionalLight = new DirectionalLight(0xffffff, 1)
directionalLight.shadow.mapSize.width = 2048 // Увеличить разрешение карты теней
directionalLight.shadow.mapSize.height = 2048
directionalLight.shadow.radius = 4
directionalLight.position.set(2, 3, 2)
directionalLight.castShadow = true
scene.add(directionalLight)

// Плоскость для тени
const planeGeometry = new PlaneGeometry(10, 10)
const planeMaterial = new ShadowMaterial({ opacity: 0.3 })
const plane = new Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -Math.PI / 2
plane.position.y = -1.2
plane.receiveShadow = true
scene.add(plane)

const loader = new GLTFLoader()
let model = null
let renderer = null

loader.load(
	'./nike/source/nike_sko_apply_all.gltf',
	(gltf) => {
		loadingStore.loading = false
		model = gltf.scene
		model.position.y = 0.2
		model.rotateX(0.4)
		model.castShadow = true
		model.scale.set(5, 5, 5)
		model.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = true
				child.receiveShadow = true
			}
		})
		scene.add(model)
	},
	() => {
		loadingStore.loading = true
	},
	(error) => {
		console.error('An error accured while loading 3D model:', error)
	}
)

const onWindowResize = () => {
	width = sceneRef.value.offsetWidth

	camera.aspect = width / height
	camera.updateProjectionMatrix()
	renderer.setSize(width, height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.render(scene, camera)
}

onMounted(() => {
	width = sceneRef.value.offsetWidth
	camera = new PerspectiveCamera(75, width / height, 0.1, 1000)
	scene.add(camera)
	camera.position.set(2.5, 0, 1)

	renderer = new WebGLRenderer()
	renderer.setSize(width, height)
	renderer.setClearColor(0xffffff) // Белый фон
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = PCFSoftShadowMap
	sceneRef.value.appendChild(renderer.domElement)

	window.addEventListener('resize', onWindowResize)

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.enableDamping = true
	controls.dampingFactor = 0.05
	controls.autoRotate = true
	controls.autoRotateSpeed = 3

	const animate = () => {
		controls.update()
		renderer.render(scene, camera)
	}
	renderer.setAnimationLoop(animate)
})

onUnmounted(() => window.removeEventListener('resize', onWindowResize))

</script>

<template>
	<div class="mt-10">
		<div class="container">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
				<div class="order-2 md:order-1">
					<h1 class="text-xl sm:text-3xl font-bold mb-3">Эти вещи подчеркнут твою индивидуальность</h1>
					<p>Интернет-магазин Vuemoda даёт возможность примерить одежду, обувь и другие товары перед оплатой заказа
						курьеру. Оплачивайте только то, что вам подошло и понравилось!</p>
				</div>
				<div
					ref="sceneRef"
					class="relative order-1 md:order-2 overflow-hidden"
				>
					<img
						src="/preloader.gif"
						alt="Preloader"
						class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
						v-show="loadingStore.loading"
					>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
canvas {
	cursor: grab;
}

canvas:active {
	cursor: grabbing;
}
</style>