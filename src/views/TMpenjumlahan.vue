<template>
    <div class="">
        <div class="bg-gray-200 flex flex-col justify-center items-center">
            <div class="text-5xl font-bold">
                <span class="bg-clip-text text-transparent bg-gradient-to-r to-green-400 from-blue-500 filter drop-shadow">
                Jenis Turing Machine
                </span>
            </div>
            <div class="my-10 bg-gradient-to-r from-green-400 to-blue-500 shadow-inner rounded rounded-xl">
                <div class=" grid grid-cols-2 justify-center items-stretch gap-6 py-6 px-6">
                <router-link to="/penjumlahan/standar">
                    <button class="btn-a text-gray-500 bg-white font-medium text-lg ring-offset-blue-50">Standar</button>
                </router-link>
                <router-link to="/penjumlahan/multitrack">
                    <button class="btn-a text-gray-500 bg-white font-medium text-lg ring-offset-blue-50">Multitrack</button>
                </router-link>
                </div>
            </div>
        </div>
    </div>
</template>