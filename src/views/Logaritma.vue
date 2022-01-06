<template>
<div class="px-4 flex flex-col justify-center items-center bg-gray-200 h-full w-full">
    <div class="mb-8">
        <div class="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 filter drop-shadow-md">
            Logaritma 
        </div>
        <div class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 filter drop-shadow-md">
            Standar
        </div>
    </div>

    <div class="w-2/6 min-h-min bg-white shadow-md flex flex-col justify-center items-center px-4 py-4 rounded-lg gap-4">
        <div class="w-full max-h-16 flex justify-center items-center rounded-lg gap-4">
            <div class="text-lg">Log(2)</div>
            <input v-model="a" :disabled="onGenerate" class="form-control" type="number" name="a" id="a" required>
        </div>
        <div v-if="!onGenerate">
            <button v-on:click="generate" type="submit" class="btn btn-indigo min-w-min">Generate</button>
        </div>
        <div v-if="onGenerate && !onStart">
            <button v-on:click="generate" type="submit" class="btn btn-indigo min-w-min">Atur Ulang</button>
        </div>
    </div>

    <div v-if="onGenerate" class="mt-4 w-min-w max-h-48 bg-white shadow-md px-4 rounded-lg flex flex-col justify-center items-center">
        <div class="mt-4" v-if="!onStart">
            <button v-on:click="start" class="btn btn-indigo">Mulai</button>
        </div>
        <div class="grid grid-flow-col auto-cols-max items-center justify-center gap-2 my-6">
            <div v-for="tape in tapes" v-bind:key="tape" :class="{ 'animate-pulse bg-green-400 text-white': tape.current, 'bg-white text-gray-500 shadow': !tape.current, }" class=" h-8 w-8 text-lg text-bold shadow">{{tape.symbol}}</div>
        </div>
    </div>
    <div v-if="finish" class="bg-white rounded rounded-lg shadow-md py-1 px-6 mt-4 justify-center items-center">
        <div class="text-gray-600 text-lg font-bold mb-3">Hasil</div>
        <div class="text-green-400 text-lg mb-3">{{hasil}}</div>
    </div>
   <div class="bg-white rounded rounded-lg shadow-md py-3 px-6 mt-4 mb-8">
        <div class="text-gray-600 text-lg font-bold mb-3">Atur Kecepatan <span class="text-gray-400 text-sm">(ms)</span></div>
        <input v-model="delay" class="form-control mb-2" type="number" min="50" max="3000" name="a" id="a" step="50" required>
        <input type="range" min="50" max="3000" step="50" v-model="delay">
    </div>
</div>
</template>

<script>
export default {
  name: 'Logaritma',
  props: {

  },
  data(){
        return {
            tapes: [ ],
            onGenerate: false,
            onStart: false,
            finish: false,
            a: 0,
            active:3,
            before:3,
            hasil: 0,
            delay: 2000
      }
  },
  methods: {
    
    generate() {
        if(this.onGenerate == false){
            this.onGenerate = true
            this.active = Math.abs(this.a) + 3
            this.before = Math.abs(this.a) + 3
            this.tapes.length = 0
            for(var i = 0; i < Math.abs(this.a) +3 ; i++){
                this.tapes.push({symbol:"b", current:false})
            }
            if(this.a >= 0){
                this.tapes.push({symbol:"x", current:false})
            }
            else if(this.a < 0){
                this.tapes.push({symbol:"y", current:false})
            }
            for(i = 0; i < Math.abs(this.a); i++){
                this.tapes.push({symbol:"0", current:false})
            }
            this.tapes.push({symbol:"1", current:false})
            for(i = 0; i < Math.abs(this.a) + 3 ; i++){
                this.tapes.push({symbol:"b", current:false})
            }
            this.tapes[this.active].current = true 
        }
        else{
            this.onGenerate = false
        }
    },
    start(){
        if(this.a == 0){
            alert("Tidak terdefinsisi")
        }
        else{
            this.onStart = true
            alert("Mulai")
            this.q0(this.tapes, this.before, this.active)
        }
    },
    q0(tapes, before, active){          //ganti nama state
        tapes[before].current = false;  //gak usah edit
        this.before = active            //gak usah edit
        tapes[active].current = true;   //gak usah edit
        switch (tapes[active].symbol) { //gak usah edit
            case 'x':                                                           //ganti apa aja case symbol di state saaat ini
                tapes[active].symbol = "1"                                      //symbol input diubah jadi apa
                setTimeout(() => this.q1(tapes, active, active+1), this.delay); //q1 ganti nama state, active+1 kalo ke kanan, -1 ke kiri
                break;                                  
            case '1':                                                           
                tapes[active].symbol = "y"                      
                setTimeout(() => this.q19(tapes, active, active+1), this.delay);
                break;
            case 'y':                                                           
                tapes[active].symbol = "b"                      
                setTimeout(() => this.q18(tapes, active, active+1), this.delay);
                break;
        }
    },
    q1(tapes, before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "b"
                setTimeout(() => this.q2(tapes, active, active+1), this.delay);
                break;
            case '1':
                tapes[active].symbol = "b"
                setTimeout(() => this.q7(tapes, active, active-1), this.delay);
                break;
        }
    },
    q2(tapes, before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "b"
                setTimeout(() => this.q3(tapes, active, active+1), this.delay);
                break;
            case '1':
                tapes[active].symbol = "b"
                setTimeout(() => this.q12(tapes, active, active+1), this.delay);
                break;
        }
    },
    q3(tapes, before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q3(tapes, active, active+1), this.delay);
                break;
            case '1':
                tapes[active].symbol = "1"
                setTimeout(() => this.q4(tapes, active, active+1), this.delay);
                break;
        }
    },
    q4(tapes, before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true;  
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q4(tapes, active, active+1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "0"
 
                setTimeout(() => this.q5(tapes, active, active-1), this.delay);
                break;
        }
    },
    q5(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q5(tapes, active, active-1), this.delay);
                break;
            case '1':
                tapes[active].symbol = "1"
                setTimeout(() => this.q6(tapes, active, active-1), this.delay);
                break;
        }
    },
    q6(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q6(tapes, active, active-1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q1(tapes, active, active+1), this.delay);
                break;
        }
    },
    q7(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q7(tapes, active, active-1), this.delay);
                break;
            case '1':
                tapes[active].symbol = "1"
                setTimeout(() => this.q8(tapes, active, active-1), this.delay);
                break;
        }
    },
    q8(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q8(tapes, active, active-1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "0"

                setTimeout(() => this.q9(tapes, active, active+1), this.delay);
                break;
        }
    },
    q9(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q9(tapes, active, active+1), this.delay);
                break;
            case '1':
                tapes[active].symbol = "1"
                setTimeout(() => this.q10(tapes, active, active+1), this.delay);
                break;
        }
    },
    q10(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q10(tapes, active, active+1), this.delay);
                break;
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q11(tapes, active, active+1), this.delay);
                break;
        }
    },
    q11(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q11(tapes, active, active+1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "1"
    
                setTimeout(() => this.q6(tapes, active, active-1), this.delay);
                break;
        }
    },
    q12(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q13(tapes, active, active-1), this.delay);
                break;
            case '0':
                tapes[active].symbol = "b"
                setTimeout(() => this.q16(tapes, active, active+1), this.delay);
                break;
        }
    },
    q13(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '1':
                tapes[active].symbol = "b"
                setTimeout(() => this.q14(tapes, active, active-1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q13(tapes, active, active-1), this.delay);
                break;
        }
    },
    q14(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q14(tapes, active, active-1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "x"
   
                setTimeout(() => this.q15(tapes, active, active+1), this.delay);
                break;
        }
    },
    q15(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "0"
                setTimeout(() => this.q15(tapes, active, active+1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q21(tapes, active, active+1), this.delay);
                break;
        }
    },
    q16(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case '0':
                tapes[active].symbol = "b"
                setTimeout(() => this.q16(tapes, active, active+1), this.delay);
                break;
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q16(tapes, active, active-1), this.delay);
                break;
            case '1':
                tapes[active].symbol = "b"
                setTimeout(() => this.q17(tapes, active, active-1), this.delay);
                break;
        }
    },
    q17(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case 'b':
                tapes[active].symbol = "y"

                setTimeout(() => this.q19(tapes, active, active+1), this.delay);
                break;
            case '0':
                tapes[active].symbol = "b"
                setTimeout(() => this.q17(tapes, active, active-1), this.delay);
                break;
        }
    },
    q18(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case 'b':
                tapes[active].symbol = "y"
         
                setTimeout(() => this.q19(tapes, active, active+1), this.delay);
                break;
            case '0':
                tapes[active].symbol = "b"
                setTimeout(() => this.q18(tapes, active, active+1), this.delay);
                break;
        }
    },
    q19(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case 'b':
                tapes[active].symbol = "x"
                setTimeout(() => this.q20(tapes, active, active+1), this.delay);
                break;
        }
    },
    q20(tapes,before, active){
        tapes[before].current = false; 
        this.before = active
        tapes[active].current = true; 
        switch (tapes[active].symbol) {
            case 'b':
                tapes[active].symbol = "b"
                setTimeout(() => this.q21(tapes, active, active+1), this.delay);
                break;
        }
    },
    q21(tapes,before, active){
        for(var i = 0; i < tapes.length; ++i){
        if(tapes[i].symbol == "0")
            this.hasil++;
        }
        if(tapes[active].symbol == "1"){
            this.hasil = 1
        }
        this.finish = true
    },
  },
  mounted: function() {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
