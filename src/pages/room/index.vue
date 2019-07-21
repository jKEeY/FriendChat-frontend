<template src="./room.html"></template>
<script src="./room.js"></script>
<style>
.c-wrapp {
  height: 100%;
  width: 100%;
  position: relative;
}

.c-messages {
  height: 80%;
  padding: 0 12px;
  margin-bottom: 100px;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  bottom: 0; left: 0; right: 0;
  max-height: 100%;
}

.c-form {
  padding: 1rem;
  height: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  display: flex;
  background-color: #212121;
}
</style>
