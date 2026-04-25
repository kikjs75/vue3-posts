<script setup>
import TheHeader from './layouts/TheHeader.vue';
import TheView from './layouts/TheView.vue';
// import { useAlert } from './composables/alert';

// const { alerts } = useAlert(); // 여러 메시지 저장 변수 반환
</script>

<template>
	<TheHeader></TheHeader>
	<TheView></TheView>
	<!-- <AppAlert :items="alerts" /> 위에서 변수 전달해서 표시. -->
	<AppAlert />
</template>

<style></style>
