class bangunan {
    public p:number;
    public l:number;
    public t:number;
    //deklarasi harga bahan
    hargaBata:number=700;
    hargaBatuPecah:number=225000;
    hargasemengresik:number=60000;
    hargapasir:number=200000;
    hargapasirUrug:number=150000;
    hargaKeramik:number;//isi 6 dlm 1 kardus
    hargasemenPutih:number=65000;
    //deklarasi variabel Jasa
    hargaPekerja:number=70750;
    hargaPekerjaTerampil:number=73750 ;
    hargaTukangBatu:number=80750;
    volume(panjang, lebar, tinggi) {
        
        if(tinggi==undefined){
            return panjang*lebar*1;//hitungan volume m2
        }
        else
        {
        return panjang*lebar*tinggi;//hitungan volume m3
        }
    }
    //fungsi hitung semen
    semenPC(){
        let kg:number;
        kg=this.hargasemengresik/40;
       return this.volume(this.p, this.l, this.t)*kg;
    }
    //rinci materaial
    rinciSemen(rumus){
        return (rumus*this.semenPC())/this.hargasemengresik;
    }
    rinciBatu(rumus){
        return (rumus*this.volume(this.p,this.l,this.t))/this.hargaBatuPecah;
    }
    rinciPasir(rumus){
        return (rumus*this.volume(this.p,this.l,this.t))/this.hargapasir;
    }
    rinciUrug(rumus){
        return (rumus*this.volume(this.p,this.l,this.t))/this.hargapasirUrug;
    }
    //fungsi hitung pasir pasang
    pasirpasang(){
        return this.volume(this.p, this.l, this.t)*this.hargapasir;
    }
    //fungsi hitng pasir urug
    pasirUrug(){
        return this.volume(this.p,this.l,this.t)*this.hargapasirUrug;
    }
    //fungsi analisa biaya pekerja
    pekerja(){
        return this.volume(this.p,this.l,this.t)*this.hargaPekerja;
    }
    pekerjaTerampil(){
        return this.volume(this.p,this.l,this.t)*this.hargaPekerjaTerampil;
    }
    tukangbatu(){
        return this.volume(this.p,this.l,this.t)*this.hargaTukangBatu;
    }
}
//galian tanah pondasi 1meter
class galian extends bangunan
{
    pekerjagalian(){
        return 0.75*this.pekerja();
    }
}
//urugan 
class Urugan extends bangunan
{
    urugkibik(){
        return this.rinciUrug(1.2);
    }
    urugan(){
        return 1.2*this.pasirUrug();
    }
    pekerjaurugan(){
        return 0.3*this.pekerja();
    }
}
//MEMASANG BATU KOSONG (Aanstampeng) (354)
class anstampeng extends bangunan
{
    //batu pecah 15/20
    Batukibik(){
        return this.rinciBatu(1.2);
    }
    batupecah()
    {
        return 1.2*this.volume(this.p,this.l,this.t)*this.hargaBatuPecah;
    }
    urugkibik(){
        return this.rinciUrug(0.432);
    }
    pasirU()
    {
        return 0.432*this.pasirUrug();
    }
    terampil(){
        return 0.78*this.pekerjaTerampil();
    }
    tkbatu(){
        return 0.39*this.tukangbatu();
    }
}
//pondasi 1:3 1:5, 1:8
class pondasi extends bangunan{
    rumusbatu:number=1.2;
    rumussemen:number=136;
    rumuspasir:number=0.544;
    batukibik(){
        return this.rinciBatu(this.rumusbatu);
    }
    batupondasi(){
        return this.rumusbatu*this.volume(this.p,this.l,this.t)*this.hargaBatuPecah;
    }
    rinci(){
        return Math.round(this.rinciSemen(this.rumussemen));
    }
    jumlahsemen(){
        return this.rumussemen*this.semenPC();
    }   
    pasirkibik(){
        return this.rinciPasir(this.rumuspasir);
    }
    jumlahpasir(){
        return this.rumuspasir*this.pasirpasang();
    
    }
    pekerjapondasi(){
        return 1.5*this.pekerjaTerampil();
    }
    tbatu(){
        return 0.75*this.tukangbatu();
    }
}
//PASANGAN DINDING BATA MERAH 1:3, 1:5 1:6 untuk yang campur kapur belum 1:4 yg dipakai
class setengahbata extends bangunan
{
    
    rumuspasir:number;
    rumussemen:number;
    batarinci(){
        return 70*this.volume(this.p,this.l,this.t);
    }
    bata(){

        return 70*this.volume(this.p,this.l,this.t)*this.hargaBata;
    }
    rinci(){
        let rinci:number;
        rinci=Math.round(this.rinciSemen(this.rumussemen));
        return rinci;
    }
    semen(){
        
        return (this.rumussemen*this.semenPC());
    }

    pasirkibik(){
        return this.rinciPasir(this.rumuspasir);
    }
    pasir(){
        return this.rumuspasir*this.pasirpasang();
    }
    terampil(){
        return 0.3*this.pekerjaTerampil();
    }
    tkbatu(){
        return 0.1 *this.tukangbatu();
    }
    
}
//keramik 
class keramik extends bangunan{
    rumuskeramik:number;
    rumussemen:number;
    rumussemenputih:number;
    hasil:number;
    keramik(){
        return this.rumuskeramik*this.volume(this.p,this.l,this.t)*this.hargaKeramik; 
    }
    bijiankeramik(){
        return this.keramik()/60000;
    }
    semen(){
        return this.rumussemen*this.semenPC();
    }
    rinci(){
        return Math.round(this.rinciSemen(this.rumussemen));
    }
    pasir(){
        return 0.045*this.pasirpasang();
    }
    pasirkibik(){
        return this.rinciPasir(0.045);
    }
    //rinci semen putih masih nb=belum
    semenputih(){
        let tot:number;
        this.hasil=this.hargasemenPutih/40;

        tot=this.rumussemenputih*this.volume(this.p,this.l,this.t)*this.hasil;
        return tot;
    }
    rinciputih(){
        return this.semenputih()/this.hasil;
    }
    pekerjakera(){
        return 0.7*this.pekerjaTerampil();
    }
    tbatu(){
        return 0.35*this.tukangbatu();
    }
}
//jenis spesifikasi 1pc : 4pp
class dindingTerawangRoster extends bangunan{
    hargaroster:number=9000;
    pasir(){
        return 0.035*this.pasirpasang();
    }
    semen(){
        return 11*this.semenPC();
    }
    roster(){
        return 30*this.hargaroster*this.volume(this.p,this.l,this.t);
    }
}
//Plesteran 1 PC : 6 PP, Tebal 15 mm
class plesteran extends bangunan{
    rumussemen:number;
    rumuspasir:number;
    rinci(){
        return this.rinciSemen(this.rumussemen);
    }
    semen(){
        return this.rumussemen*this.semenPC();
    }
    pasirkibik(){
        return this.rinciPasir(this.rumuspasir);
    }
    pasir(){
        return this.rumuspasir*this.pasirpasang();
    }
    pekerjaples(){
        return 0.3*this.pekerjaTerampil();
    }
    tbatu(){
        return 0.15*this.tukangbatu();
    }
}
//acian
class acian extends bangunan{
    rinci(){
        return this.rinciSemen(3.25);
    }
    semen(){
        return 3.25 * this.semenPC();
    }
}

function hitung(volPanjang,vollebar,voltinggi,jenis):void
{
    let inputan =new bangunan();
    let datapanjang, datalebar,datatinggi:number;
    datapanjang=parseFloat((<HTMLInputElement>document.getElementById(volPanjang)).value);
    datalebar=parseFloat((<HTMLInputElement>document.getElementById(vollebar)).value);
    datatinggi=parseFloat((<HTMLInputElement>document.getElementById(voltinggi)).value);
    
    if(jenis=="gal"){
        let out = new galian();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        document.getElementById("lblPGalian").innerHTML = out.pekerjagalian().toString();
        hasil=out.pekerjagalian();
        document.getElementById("totbiayagalian").innerHTML = hasil.toString();
    }
    else if(jenis == "tampeng"){
        let out = new anstampeng();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        document.getElementById("lblBPecahAan").innerHTML = out.Batukibik().toString()+"m3   Rp"+out.batupecah().toString();
        document.getElementById("lblTPasirUAan").innerHTML = out.urugkibik().toString()+"m3   Rp"+out.pasirU().toString();
        document.getElementById("lblPterampilAan").innerHTML = out.terampil().toString();
        document.getElementById("lblTbatuAan").innerHTML = out.tkbatu().toString();
        hasil=out.batupecah()+out.pasirU()+out.terampil()+out.tkbatu();         
        document.getElementById("totbiayaanstampeng").innerHTML = hasil.toString();
        
    }
    else if(jenis == "pon"){
        let out = new pondasi();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        document.getElementById("jmlbatupon").innerHTML = out.batukibik()+"m3".toString();
        document.getElementById("hgbatupon").innerHTML = "Rp"+out.batupondasi().toString();
        document.getElementById("jmlsempon").innerHTML = out.rinci()+"Zax".toString();
        document.getElementById("hgsempon").innerHTML = "Rp "+out.jumlahsemen().toString();
        document.getElementById("jmlpaspon").innerHTML =out.pasirkibik()+"m3".toString();
        document.getElementById("hgpaspon").innerHTML = "Rp "+out.jumlahpasir().toString();
        
        hasil=out.batupondasi()+out.jumlahpasir()+out.jumlahsemen()+out.pekerjapondasi()+out.tbatu();
        document.getElementById("totpon").innerHTML = hasil.toString();
    }
    else if(jenis == "mengurug"){
        let out = new Urugan();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        document.getElementById("lblTUrugPB").innerHTML =out.urugkibik().toString()+"m3   Rp"+out.urugan().toString();
        document.getElementById("lblPUrugPB").innerHTML =out.pekerjaurugan().toString();
        hasil=out.urugan()+out.pekerjaurugan();
        document.getElementById("lbltotalurugan").innerHTML = hasil.toString();
    }
    else {

    }
    //else if(jenis == "ringsloff"){
        //let out = new ();
        //out.p=datapanjang;
        //out.l=datalebar;
       // out.t=datatinggi;
       // document.getElementById("lblPGalian").innerHTML =
    //}
    //else if(jenis == "ringkolom"){
        //let out = new ();
        //out.p=datapanjang;
        //out.l=datalebar;
       // out.t=datatinggi;
       // document.getElementById("lblPGalian").innerHTML =
    //}
    //else if(jenis == "ringbalok"){
        //let out = new ();
        //out.p=datapanjang;
       // out.l=datalebar;
        //out.t=datatinggi;
       // document.getElementById("lblPGalian").innerHTML =
    //}
    
}
function hitungm(volPanjang,vollebar,spek,jenis):void{
    let datapanjang,datalebar:number;
    let select:string;
    select=((<HTMLInputElement>document.getElementById(spek)).value);
    datapanjang=parseFloat((<HTMLInputElement>document.getElementById(volPanjang)).value);
    datalebar=parseFloat((<HTMLInputElement>document.getElementById(vollebar)).value);
    //kondisi spesifikasi
    
    
    if(jenis == "pasbata"){
        let out = new setengahbata();
        out.p=datapanjang;
        out.l=datalebar;
        if(select == "bata1"){
            out.rumuspasir =0.043;
            out.rumussemen=11.5;
            
        }
        else if(select == "bata2"){
            out.rumuspasir =0.049;
            out.rumussemen=8.32;
        }else{}
        let hasil=0;
        document.getElementById("jmlbata").innerHTML = out.batarinci()+"Biji".toString();
        document.getElementById("hgbata").innerHTML ="Rp "+out.bata().toString();
        document.getElementById("jmlsembata").innerHTML = out.rinci()+"Zax".toString();
        document.getElementById("hgsembata").innerHTML =" Rp"+out.semen().toString();
        document.getElementById("jmlpasbata").innerHTML =out.pasirkibik()+"m3".toString();
        document.getElementById("hgpasbata").innerHTML = "Rp "+out.pasir().toString();

        hasil=out.bata()+out.semen()+out.pasir()+out.terampil()+out.tkbatu();
        document.getElementById("totbata").innerHTML = hasil.toString();
    }
    else if(jenis == "pasplesteran"){
        let out = new plesteran();
        out.p=datapanjang;
        out.l=datalebar;
        if(select == "ples1"){
            out.rumuspasir=6.24;
            out.rumussemen=0.024;
        }else if(select == "ples2"){
            out.rumuspasir=4.416;
            out.rumussemen=0.027;
        }else{}
        let hasil=0;
        document.getElementById("jmlsemples").innerHTML = out.rinci()+"Zak".toString();  
        document.getElementById("hgsemples").innerHTML =  " Rp"+out.semen().toString(); 
        document.getElementById("jmlpasples").innerHTML = out.pasirkibik()+"m3".toString();
        document.getElementById("hgpasples").innerHTML = " Rp"+out.pasir().toString();
        hasil=out.semen()+out.pasir()+out.pekerjaples()+out.tbatu();
        document.getElementById("totples").innerHTML = hasil.toString();
                        
    }
    else if(jenis == "pasacian"){
        let out = new acian();
        out.p=datapanjang;
        out.l=datalebar;
        let hasil=0;
        document.getElementById("jmlsemaci").innerHTML = out.rinci()+"Zak".toString();  
        document.getElementById("hgsemaci").innerHTML =" Rp"+out.semen().toString();
        
         hasil=out.semen();
        document.getElementById("totaci").innerHTML = hasil.toString();
    }
    else if(jenis == "paskera"){
        let out = new keramik();
        out.p=datapanjang;
        out.l=datalebar;
        let hasil=0;
        if(select == "kera1"){
            out.hargaKeramik=38000/11;
            out.rumuskeramik=11.87;
            out.rumussemen=10;
            out.rumussemenputih=1.5;
        }
        else if(select == "kera2"){
            out.hargaKeramik=55000/6;
            out.rumuskeramik=6.63;
            out.rumussemen=9.8;
            out.rumussemenputih=1.3;
        }else{}
        document.getElementById("jmlkera").innerHTML = out.bijiankeramik()+"Biji".toString();  
        document.getElementById("hgkera").innerHTML = "Rp"+out.keramik().toString();
        document.getElementById("jmlsemkera").innerHTML = out.rinci()+"Zak".toString();
        document.getElementById("hgsemkera").innerHTML ="Rp"+out.semen().toString();
        document.getElementById("jmlpaskera").innerHTML = out.pasirkibik()+"m3".toString();
        document.getElementById("hgpaskera").innerHTML = "Rp"+out.pasir().toString();
        document.getElementById("jmlputkera").innerHTML = out.rinciputih()+"Kg".toString();
        document.getElementById("hgputkera").innerHTML = "Rp"+out.semenputih().toString();
        //total seluruh
        hasil=out.keramik()+out.semen()+out.pasir()+out.semenputih();
        document.getElementById("totkera").innerHTML = hasil.toString();
        
    }
    else{}
}
//let hasil= new dindingTerawangRoster();
//console.log(hasil.pasir());
//console.log(hasil.semen());
//console.log(hasil.roster());
//console.log(hasil.pasir()+hasil.semen()+hasil.roster());