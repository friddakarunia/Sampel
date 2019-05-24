class bangunan {
    public p:number;
    public l:number;
    public la:number;
    public lb:number;
    public t:number;
    //deklarasi harga bahan
    hargaBata:number=700;
    hargaBatuPecah:number=225000;
    hargasemengresik:number=60000;
    hargapasir:number=200000;
    hargapasirUrug:number=150000;
    hargaKeramik:number;//isi 6 dlm 1 kardus
    hargasemenPutih:number=65000;
    //belum ada harga
    hargakayu3:number=99000;
    hargapaku:number=3700;
    hargaminyakbek:number=10;
    hargabesibeton:number=10;
    hargakawatikatB:number=10; 
    hargapasirbtn:number=10; 
    hargabpecahmesin:number=1000;
    hargaplywood:number=100;
    hargadolken:number=100;
    hargaplamir:number=6500;
    hargacatdasar:number=18000;
    hargacatpenutup:number;
    //deklarasi variabel Jasa
    hargaPekerja:number=65000;
    hargaPekerjaTerampil:number=73750 ;
    hargaTukangBatu:number=80750;
    hargaTukangcat:number=60000;
    volume(panjang, lebar, tinggi) {
        
        if(tinggi==undefined){
            return panjang*lebar*1;//hitungan volume m2
        }
        else
        {
        return panjang*lebar*tinggi;//hitungan volume m3
        }
    }
    volumepondasi(lebaratas,lebarbawah,tinggi,panjang){
       let hasil:number;
       hasil =(lebaratas+lebarbawah)/2;

        return  hasil * tinggi *panjang;;
    }
    // fungsi format angka jadi Rupiah
    formatAngka(Rupiah)
        {
            var rev=Rupiah.toString().split('').reverse().join(''),
            ribuan=rev.match(/\d{1,3}/g);
            ribuan=ribuan.join('.').split('').reverse().join('');
            return "Rp."+ribuan;
        }
    //fungsi hitung semen all
    semenPC(){
        let kg:number;
        kg=this.hargasemengresik/40;
       return this.volume(this.p, this.l, this.t)*kg;
    }
    //fungsi hitung semen khusus pondasi
    semenPCpon(){
        let kgpon:number;
        kgpon=this.hargasemengresik/40;
       return this.volumepondasi(this.la,this.lb,this.t,this.p)*kgpon;
    }
    //rinci materaial all
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
    //rinci material khusus pondasi
    rinciSemenpon(rumus){
        return (rumus*this.semenPCpon())/this.hargasemengresik;
    }
    rinciBatupon(rumus){
        return (rumus*this.volumepondasi(this.la,this.lb,this.t,this.p))/this.hargaBatuPecah;
    }
    rinciPasirpon(rumus){
        return (rumus*this.volumepondasi(this.la,this.lb,this.t,this.p))/this.hargapasir;
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
        return Math.ceil(0.75*this.pekerja());
    }
}
//urugan 
class Urugan extends bangunan
{
    urugkibik(){
        return this.volume(this.p,this.l,this.t)*1.2;
    }
    urugan(){
        return Math.ceil(1.2*this.pasirUrug());
    }
    pekerjaurugan(){
        return Math.ceil(0.3*this.pekerja());
    }
}
//MEMASANG PONDASI BATU KOSONG (Aanstampeng) (354)
class anstampeng extends bangunan
{
    //batu pecah 15/20
    Batukibik(){
        return this.volume(this.p,this.l,this.t)*1.2;
    }
    batupecah()
    {
        return Math.ceil(1.2*this.volume(this.p,this.l,this.t)*this.hargaBatuPecah);
    }
    urugkibik(){
        return this.volume(this.p,this.l,this.t)*0.432;
    }
    pasirU()
    {
        return Math.ceil(0.432*this.pasirUrug());
    }
    terampil(){
        return Math.ceil(0.78*this.pekerjaTerampil());
    }
    tkbatu(){
        return Math.ceil(0.39*this.tukangbatu());
    }
}
//pondasi 1:3 1:5, 1:8
class pondasi extends bangunan{
    rumusbatu:number=1.2;
    rumussemen:number=136;
    rumuspasir:number=0.544;
    batukibik(){
       return this.rumusbatu*this.volumepondasi(this.la,this.lb,this.t,this.p);
    }
    batupondasi(){
        return Math.ceil(this.rumusbatu*this.volumepondasi(this.la,this.lb,this.t,this.p)*this.hargaBatuPecah);
    }
     semenkg(){
        return this.rinciSemenpon(this.rumussemen)*40;
    }
    semenperzax(){
        return Math.ceil(this.jumlahsemen()/this.rinci());
    }
    rinci(){
        return Math.ceil(this.rinciSemenpon(this.rumussemen));
    }
    jumlahsemen(){    
        return Math.ceil(this.rumussemen*this.semenPCpon());
    }
    pasirkibik(){
       return this.rumuspasir*this.volumepondasi(this.la,this.lb,this.t,this.p);
    }
    jumlahpasir(){
       return Math.ceil(this.rumuspasir*this.volumepondasi(this.la,this.lb,this.t,this.p)*this.hargapasir);
    
    }
    pekerjapondasi(){
        return Math.ceil(1.5*this.volumepondasi(this.la,this.lb,this.t,this.p)*this.hargaPekerjaTerampil);
    }
    tbatu(){
        return Math.ceil(0.75*this.volumepondasi(this.la,this.lb,this.t,this.p)*this.hargaTukangBatu);
    }
}
//PASANGAN DINDING BATA MERAH 1:3, 1:5 1:6 untuk yang campur kapur belum 1:4 yg dipakai
class setengahbata extends bangunan
{
    rumuspasir:number;
    rumussemen:number;
    bata(){

        return 70*this.volume(this.p,this.l,this.t)*this.hargaBata;
    }
    bijianbata(){
        return Math.ceil(this.bata()/700);
    }
    semenkg(){
        return this.rinciSemen(this.rumussemen)*40;
    }
    semenperzax(){
        return Math.ceil(this.semen()/this.rinci());
    }
    rinci(){
        return Math.ceil(this.rinciSemen(this.rumussemen));
    }
    semen(){
        
        return (this.rumussemen*this.semenPC());
    }

    pasirkibik(){
        return this.volume(this.p,this.l,this.t)*(this.rumuspasir);
    }
    pasir(){
        return Math.ceil(this.rumuspasir*this.pasirpasang());
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
        return Math.ceil(this.rumuskeramik*this.volume(this.p,this.l,this.t)*this.hargaKeramik); 
    }
    bijiankeramik(){
        return Math.ceil(this.keramik()/60000*6);
    }
    semenkg(){
        return this.rinciSemen(this.rumussemen)*40;
    }
    semenperzax(){
        return Math.ceil(this.semen()/this.rinci());
    }
    semen(){
        return Math.ceil(this.rumussemen*this.semenPC());
    }
    rinci(){
        return Math.ceil(this.rinciSemen(this.rumussemen));
    }
    pasir(){
        return 0.045*this.pasirpasang();
    }
    pasirkibik(){
        return this.volume(this.p,this.l,this.t)*0.045;
    }
    //rinci semen putih masih nb=belum
    semenputih(){
        let tot:number;
        this.hasil=this.hargasemenPutih/40;

        tot=Math.ceil(this.rumussemenputih*this.volume(this.p,this.l,this.t)*this.hasil);
        return tot;
    }
    rinciputih(){
        return (this.semenputih()/this.hasil);
    }
    pekerjakera(){
        return Math.ceil(0.7*this.pekerjaTerampil());
    }
    tbatu(){
        return Math.ceil(0.35*this.tukangbatu());
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
    semenperzax(){
        return Math.ceil(this.semen()/this.rinci());
    }
    rinci(){
        return Math.ceil(this.rinciSemen(this.rumussemen));
    }
    semenkg(){
        return this.rinciSemen(this.rumussemen)*40;
    }
    semen(){
        return Math.ceil(this.rumussemen*this.semenPC());
    }
    pasirkibik(){
        return this.volume(this.p,this.l,this.t)*this.rumuspasir;
    }
    pasir(){
        return this.rumuspasir*this.pasirpasang();
    }
    pekerjaples(){
        return Math.ceil(0.3*this.pekerjaTerampil());
    }
    tbatu(){
        return Math.ceil(0.15*this.tukangbatu());
    }
}
//acian
class acian extends bangunan{
    semenperzax(){
        return Math.ceil(this.semen()/this.rinci());
    }
    rinci(){
        return Math.ceil(this.rinciSemen(3.25));
    }
    semenkg(){
        return this.rinciSemen(3.25)*40;
    }
    semen(){
        return Math.ceil(3.25 * this.semenPC());
    }
    pekerja(){
        return Math.ceil(0.2*this.pekerjaTerampil());
    }
    tbatu(){
        return Math.ceil(0.1*this.tukangbatu());
    }
}
//pasangan sloof (Sloof Beton Bertulang (200 kg besi + bekisting) (978))
class sloff extends bangunan{
    kayu(){
        return Math.ceil(0.27*this.hargakayu3*this.volume(this.p,this.l,this.t));
    }
    meterkayu(){
        return this.volume(this.p,this.l,this.t)*0.27;
    }
    paku(){
        return Math.ceil (2*this.hargapaku*this.volume(this.p,this.l,this.t));
    }
    kgpaku(){
        return 2*this.volume(this.p,this.l,this.t);
    }
    minyakbek(){
        return Math.ceil(0.6*this.hargaminyakbek*this.volume(this.p,this.l,this.t));
    }
    literminyak(){
        return 0.6*this.volume(this.p,this.l,this.t);
    }
    besibetonp(){
        return Math.ceil(210*this.hargabesibeton*this.volume(this.p,this.l,this.t));
    }
    kgbesi(){
        return 210*this.volume(this.p,this.l,this.t);
    }
    kawatikatB(){
        return Math.ceil(3*this.hargakawatikatB*this.volume(this.p,this.l,this.t));
    }
    kgkawat(){
        return 3*this.volume(this.p,this.l,this.t);
    }
    semen(){
        return Math.ceil(336 * this.semenPC());
    }
    rinci(){
        return Math.ceil(this.rinciSemen(336));
    }
    semenkg(){
        return this.rinciSemen(336)*40;
    }
    semenperzax(){
        return Math.ceil(this.semen()/this.rinci());
    }
    pasirbeton(){
        return Math.ceil(0.54*this.hargapasirbtn*this.volume(this.p,this.l,this.t));
    }
    meterpasir(){
        return this.volume(this.p,this.l,this.t)*0.54;
    }
    Batukibik(){
        return this.volume(this.p,this.l,this.t)*0.81;
    }
    batupecah()
    {
        return Math.ceil(0.81*this.hargabpecahmesin*this.volume(this.p,this.l,this.t));
    }
    pekerja(){
        return Math.ceil(0.52*this.pekerjaTerampil());
    }
    tbatu(){
        return Math.ceil(0.26*this.tukangbatu());
    }
}
//pasangan kolom (Kolom Beton Bertulang (300 kg besi + bekisting)(999))
class kolom extends bangunan{
    kayu(){
        return Math.ceil(0.4*this.hargakayu3*this.volume(this.p,this.l,this.t));
    }
    meterkayu(){
        return this.volume(this.p,this.l,this.t)*0.4;
    }
    paku(){
        return Math.ceil (4*this.hargapaku*this.volume(this.p,this.l,this.t));
    }
    kgpaku(){
        return 4*this.volume(this.p,this.l,this.t);
    }
    minyakbek(){
        return Math.ceil(2*this.hargaminyakbek*this.volume(this.p,this.l,this.t));
    }
    literminyak(){
        return 2*this.volume(this.p,this.l,this.t);
    }
    besibetonp(){
        return Math.ceil(315*this.hargabesibeton*this.volume(this.p,this.l,this.t));
    }
    kgbesi(){
        return 315*this.volume(this.p,this.l,this.t);
    }
    kawatikatB(){
        return Math.ceil(4.5*this.hargakawatikatB*this.volume(this.p,this.l,this.t));
    }
    kgkawat(){
        return 4.5*this.volume(this.p,this.l,this.t);
    }
    semen(){
        return Math.ceil(336 * this.semenPC());
    }
    rinci(){
        return Math.ceil(this.rinciSemen(336));
    }
    semenperzax(){
        return Math.ceil(this.semen()/this.rinci());
    }
    semenkg(){
        return this.rinciSemen(336)*40;
    }
    pasirbeton(){
        return Math.ceil(0.54*this.hargapasirbtn*this.volume(this.p,this.l,this.t));
    }
    meterpasir(){
        return this.volume(this.p,this.l,this.t)*0.54;
    }
    batupecah(){
        return Math.ceil(0.81*this.hargabpecahmesin*this.volume(this.p,this.l,this.t));
    }
    Batukibik(){
        return this.volume(this.p,this.l,this.t)*0.81;
    }
    kayuu(){
        return Math.ceil(0.15*this.hargakayu3*this.volume(this.p,this.l,this.t));
    }
    meterkayuu(){
        return this.volume(this.p,this.l,this.t)*0.15;
    }
    plywood(){
        return Math.ceil(3.5*this.hargaplywood*this.volume(this.p,this.l,this.t));
    }
    lbrplywood(){
        return this.volume(this.p,this.l,this.t)*3.5;
    }
    dolkenkayu(){
        return Math.ceil(20*this.hargadolken*this.volume(this.p,this.l,this.t));
    }
    btgdolken(){
        return this.volume(this.p,this.l,this.t)*20;
    }
    pekerja(){
        return Math.ceil(7.05*this.pekerjaTerampil());
    }
    tbatu(){
        return Math.ceil(0.275*this.tukangbatu());
    }
}
//pasangan balok - disamakan dengan sloof karena sloof bawah & balok atas 
//(Sloof Beton Bertulang (200 kg besi + bekisting) (978))
class balok extends bangunan{
    kayu(){
        return Math.ceil(0.27*this.hargakayu3*this.volume(this.p,this.l,this.t));
    }
    meterkayu(){
        return this.volume(this.p,this.l,this.t)*0.27;
    }
    paku(){
        return Math.ceil (2*this.hargapaku*this.volume(this.p,this.l,this.t));
    }
    kgpaku(){
        return 2*this.volume(this.p,this.l,this.t);
    }
    minyakbek(){
        return Math.ceil(0.6*this.hargaminyakbek*this.volume(this.p,this.l,this.t));
    }
    literminyak(){
        return 0.6*this.volume(this.p,this.l,this.t);
    }
    besibetonp(){
        return Math.ceil(210*this.hargabesibeton*this.volume(this.p,this.l,this.t));
    }
    kgbesi(){
        return 210*this.volume(this.p,this.l,this.t);
    }
    kawatikatB(){
        return Math.ceil(3*this.hargakawatikatB*this.volume(this.p,this.l,this.t));
    }
    kgkawat(){
        return 3*this.volume(this.p,this.l,this.t);
    }
    semen(){
        return Math.ceil(336 * this.semenPC());
    }
    rinci(){
        return Math.ceil(this.rinciSemen(336));
    }
    semenkg(){
        return this.rinciSemen(336)*40;
    }
    semenperzax(){
        return Math.ceil(this.semen()/this.rinci());
    }
    pasirbeton(){
        return Math.ceil(0.54*this.hargapasirbtn*this.volume(this.p,this.l,this.t));
    }
    meterpasir(){
        return this.volume(this.p,this.l,this.t)*0.54;
    }
    Batukibik(){
        return this.volume(this.p,this.l,this.t)*0.81;
    }
    batupecah()
    {
        return Math.ceil(0.81*this.hargabpecahmesin*this.volume(this.p,this.l,this.t));
    }
    pekerja(){
        return Math.ceil(0.52*this.pekerjaTerampil());
    }
    tbatu(){
        return Math.ceil(0.26*this.tukangbatu());
    }
}
class cat extends bangunan{
    plamir(){
        return Math.ceil(this.volume(this.p,this.l,this.t)*0.1*this.hargaplamir);
    }
    plamirkg(){
        return this.volume(this.p,this.l,this.t)*0.1;
    }
    catdasar(){
        return Math.ceil(this.volume(this.p,this.l,this.t)*0.1*this.hargacatdasar);
    }
    catdasarkg(){
        return this.volume(this.p,this.l,this.t)*0.1;
    }
    catpenutup(){
        return Math.ceil(this.volume(this.p,this.l,this.t)*0.26*this.hargacatpenutup);
    }
    penutupkg(){
        return this.volume(this.p,this.l,this.t)*0.26;
    }
    tukangcat(){
        return Math.ceil(this.volume(this.p,this.l,this.t)*0.063*this.hargaTukangcat);
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
        let Pgalian:number;
        Pgalian=out.pekerjagalian();
        document.getElementById("lblPGalian").innerHTML = out.formatAngka(Pgalian).toString();
        hasil=out.pekerjagalian();
        document.getElementById("totbiayagalian").innerHTML = out.formatAngka(hasil).toString();
    }
    else if(jenis == "tampeng"){
        let out = new anstampeng();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        let Batupch,PasirU,Tterampil,Tbatu:number;
        Batupch=out.batupecah();PasirU=out.pasirU();
        Tterampil=out.terampil();Tbatu=out.tkbatu();
        document.getElementById("lblBPecahAan").innerHTML = out.Batukibik().toFixed(1)+"m³   "+out.formatAngka(Batupch).toString();
        document.getElementById("lblTPasirUAan").innerHTML = out.urugkibik().toFixed(2)+"m³   "+out.formatAngka(PasirU).toString();
        document.getElementById("lblPterampilAan").innerHTML =out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbatuAan").innerHTML = out.formatAngka(Tbatu).toString();
        hasil=out.batupecah()+out.pasirU()+out.terampil()+out.tkbatu();         
        document.getElementById("totbiayaanstampeng").innerHTML =out.formatAngka(hasil).toString();
        
    }
    else if(jenis == "mengurug"){
        let out = new Urugan();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        let PasirU,TUrugan:number;
        PasirU=out.urugan();TUrugan=out.pekerjaurugan();
        document.getElementById("lblTUrugPB").innerHTML =out.urugkibik().toFixed(1)+"m³   "+out.formatAngka(PasirU).toString();
        document.getElementById("lblPUrugPB").innerHTML =out.formatAngka(TUrugan).toString();
        hasil=out.urugan()+out.pekerjaurugan();
        document.getElementById("lbltotalurugan").innerHTML = out.formatAngka(hasil).toString();
    }
    else if(jenis == "ringsloff"){
        let out = new sloff();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        let Kayu,Paku,Minyak,Besi,Kawat,Semen,perzax,Pasir,Batupch,Tterampil,Tbatu:number;
        Kayu=out.kayu();Paku=out.paku();Minyak=out.minyakbek();Besi=out.besibetonp();Kawat=out.kawatikatB();
        Semen=out.semen();perzax=out.semenperzax();Pasir=out.pasirbeton();Batupch=out.batupecah();
        Tterampil=out.pekerja();Tbatu=out.tbatu();
        document.getElementById("lblKayusloof").innerHTML =out.meterkayu().toFixed(2)+"m³";
        document.getElementById("lblKayuslooff").innerHTML =out.formatAngka(Kayu).toString();
        document.getElementById("lblPakusloof").innerHTML =out.kgpaku().toFixed(1)+"Kg";
        document.getElementById("lblPakuslooff").innerHTML =out.formatAngka(Paku).toString();
        document.getElementById("lblminyakbeksloof").innerHTML =out.literminyak().toFixed(1)+"Liter";
        document.getElementById("lblminyakbekslooff").innerHTML =out.formatAngka(Minyak).toString();
        document.getElementById("lblbesibpsloof").innerHTML =out.kgbesi().toFixed(1)+"Kg";
        document.getElementById("lblbesibpslooff").innerHTML =out.formatAngka(Besi).toString();
        document.getElementById("lblkawatsloof").innerHTML =out.kgkawat().toFixed(1)+"Kg";
        document.getElementById("lblkawatslooff").innerHTML =out.formatAngka(Kawat).toString();
        document.getElementById("lblsemensloof").innerHTML =out.semenkg().toFixed(1)+"kg   "+out.rinci().toString()+"Zax";
        document.getElementById("lblsemenslooff").innerHTML =out.formatAngka(Semen).toString();
        document.getElementById("lblpasirsloof").innerHTML =out.meterpasir().toFixed(2)+"m³";
        document.getElementById("lblpasirslooff").innerHTML =out.formatAngka(Pasir).toString();
        document.getElementById("lblbpsloof").innerHTML = out.Batukibik().toFixed(2)+"m³";
        document.getElementById("lblbpslooff").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblPsloof").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbsloof").innerHTML = out.formatAngka(Tbatu).toString();
        hasil=out.kayu()+out.paku()+out.minyakbek()+out.besibetonp()+out.kawatikatB()+out.semen()+
        out.pasirbeton()+out.batupecah()+out.pekerja()+out.tbatu();
        document.getElementById("lbltotalsloof").innerHTML = out.formatAngka(hasil).toString();
    }
    else if(jenis == "ringkolom"){
        let out = new kolom();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        let Kayu,Paku,Minyak,Besi,Kawat,Semen,perzax,Pasir,Batupch,Kayuu,Ply,Dolken,Tterampil,Tbatu:number;
        Kayu=out.kayu();Paku=out.paku();Minyak=out.minyakbek();Besi=out.besibetonp();Kawat=out.kawatikatB();Semen=out.semen();
        perzax=out.semenperzax();Pasir=out.pasirbeton();Batupch=out.batupecah();Kayuu=out.kayuu();Ply=out.plywood();Dolken=out.dolkenkayu();
        Tterampil=out.pekerja();Tbatu=out.tbatu();
        document.getElementById("lblKayukolom").innerHTML =out.meterkayu().toFixed(2)+"m³";
        document.getElementById("lblKayukolomm").innerHTML =out.formatAngka(Kayu).toString();
        document.getElementById("lblPakukolom").innerHTML =out.kgpaku().toFixed(1)+"Kg";
        document.getElementById("lblPakukolomm").innerHTML =out.formatAngka(Paku).toString();
        document.getElementById("lblminyakbekkolom").innerHTML =out.literminyak().toFixed(1)+"Liter";
        document.getElementById("lblminyakbekkolomm").innerHTML =out.formatAngka(Minyak).toString();
        document.getElementById("lblbesibpkolom").innerHTML =out.kgbesi().toFixed(1)+"Kg";
        document.getElementById("lblbesibpkolomm").innerHTML =out.formatAngka(Besi).toString();
        document.getElementById("lblkawatkolom").innerHTML =out.kgkawat().toFixed(1)+"Kg";
        document.getElementById("lblkawatkolomm").innerHTML =out.formatAngka(Kawat).toString();
        document.getElementById("lblsemenkolom").innerHTML =out.semenkg().toFixed(1)+"kg   "+out.rinci().toString()+"Zax";
        document.getElementById("lblsemenkolomm").innerHTML =out.formatAngka(Semen).toString();
        document.getElementById("lblpasirkolom").innerHTML =out.meterpasir().toFixed(2)+"m³";
        document.getElementById("lblpasirkolomm").innerHTML =out.formatAngka(Pasir).toString();
        document.getElementById("lblbpkolom").innerHTML = out.Batukibik().toFixed(2)+"m³";
        document.getElementById("lblbpkolomm").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblKayuduakolom").innerHTML =out.meterkayuu().toFixed(2)+"m³";
        document.getElementById("lblKayuduakolomm").innerHTML =out.formatAngka(Kayuu).toString();
        document.getElementById("lblplykolom").innerHTML = out.lbrplywood().toString()+"lembar";
        document.getElementById("lblplykolomm").innerHTML = out.formatAngka(Ply).toString();
        document.getElementById("lbldolkenkolom").innerHTML = out.btgdolken().toString()+"batang";
        document.getElementById("lbldolkenkolomm").innerHTML = out.formatAngka(Dolken).toString();
        document.getElementById("lblPkolom").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbkolom").innerHTML = out.formatAngka(Tbatu).toString();
        hasil=out.kayu()+out.paku()+out.minyakbek()+out.besibetonp()+out.kawatikatB()+out.semen()+
        out.pasirbeton()+out.batupecah()+out.kayuu()+out.plywood()+out.dolkenkayu()+out.pekerja()+out.tbatu();
        document.getElementById("lbltotalkolom").innerHTML = out.formatAngka(hasil).toString();
    }
    else if(jenis == "ringbalok"){
        let out = new balok();
        out.p=datapanjang;
        out.l=datalebar;
        out.t=datatinggi;
        let hasil:number;
        let Kayu,Paku,Minyak,Besi,Kawat,Semen,perzax,Pasir,Batupch,Tterampil,Tbatu:number;
        Kayu=out.kayu();Paku=out.paku();Minyak=out.minyakbek();Besi=out.besibetonp();Kawat=out.kawatikatB();
        Semen=out.semen();perzax=out.semenperzax();Pasir=out.pasirbeton();Batupch=out.batupecah();
        Tterampil=out.pekerja();Tbatu=out.tbatu();
        document.getElementById("lblKayubalok").innerHTML =out.meterkayu().toFixed(2)+"m³";
        document.getElementById("lblKayubalokk").innerHTML =out.formatAngka(Kayu).toString();
        document.getElementById("lblPakubalok").innerHTML =out.kgpaku().toFixed(1)+"Kg";
        document.getElementById("lblPakubalokk").innerHTML =out.formatAngka(Paku).toString();
        document.getElementById("lblminyakbekbalok").innerHTML =out.literminyak().toFixed(1)+"Liter";
        document.getElementById("lblminyakbekbalokk").innerHTML =out.formatAngka(Minyak).toString();
        document.getElementById("lblbesibpbalok").innerHTML =out.kgbesi().toFixed(1)+"Kg";
        document.getElementById("lblbesibpbalokk").innerHTML =out.formatAngka(Besi).toString();
        document.getElementById("lblkawatbalok").innerHTML =out.kgkawat().toFixed(1)+"Kg";
        document.getElementById("lblkawatbalokk").innerHTML =out.formatAngka(Kawat).toString();
        document.getElementById("lblsemenbalok").innerHTML =out.semenkg().toFixed(1)+"kg   "+out.rinci().toString()+"Zax";
        document.getElementById("lblsemenbalokk").innerHTML =out.formatAngka(Semen).toString();
        document.getElementById("lblpasirbalok").innerHTML =out.meterpasir().toFixed(2)+"m³";
        document.getElementById("lblpasirbalokk").innerHTML =out.formatAngka(Pasir).toString();
        document.getElementById("lblbpbalok").innerHTML = out.Batukibik().toFixed(2)+"m³";
        document.getElementById("lblbpbalokk").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblPbalok").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbbalok").innerHTML = out.formatAngka(Tbatu).toString();
        hasil=out.kayu()+out.paku()+out.minyakbek()+out.besibetonp()+out.kawatikatB()+out.semen()+
        out.pasirbeton()+out.batupecah()+out.pekerja()+out.tbatu();
        document.getElementById("lbltotalbalok").innerHTML = out.formatAngka(hasil).toString();
    }
    else{}
    
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
        let bata,semen,pasir:number;
        bata=out.bata();
        semen=out.semen();
        pasir=out.pasir();
        document.getElementById("jmlbata").innerHTML = out.bijianbata().toString()+"Biji";
        document.getElementById("hgbata").innerHTML =out.formatAngka(bata).toString();
        document.getElementById("jmlsembata").innerHTML = out.rinci().toString()+"Zax";
        document.getElementById("hgsembata").innerHTML =out.formatAngka(semen).toString();
        document.getElementById("jmlpasbata").innerHTML =out.pasirkibik().toFixed(1)+"m3";
        document.getElementById("hgpasbata").innerHTML = out.formatAngka(pasir).toString();

        hasil=semen+bata+pasir;
        document.getElementById("totbata").innerHTML = hasil.toString();
    }
    else if(jenis == "pasplesteran"){
        let out = new plesteran();
        out.p=datapanjang;
        out.l=datalebar;
        if(select == "ples1"){
            out.rumussemen=6.24;
            out.rumuspasir=0.024;
        }else if(select == "ples2"){
            out.rumussemen=4.416;
            out.rumuspasir=0.027;
        }else{}
        let hasil=0;
        let semen,pasir:number;
        
        semen=out.semen();
        pasir=out.pasir();
        document.getElementById("jmlsemples").innerHTML = out.rinci()+"Zak".toString();  
        document.getElementById("hgsemples").innerHTML =  out.formatAngka(semen).toString(); 
        document.getElementById("jmlpasples").innerHTML = out.pasirkibik()+"m3".toString();
        document.getElementById("hgpasples").innerHTML = out.formatAngka(pasir).toString();
        hasil=semen+pasir;
        document.getElementById("totples").innerHTML = hasil.toString();
                        
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
        let kera,semput,semen,pasir:number;
        kera=out.keramik();
        semen=out.semen();
        semput=out.semenputih();
        pasir=out.pasir();
        document.getElementById("jmlkera").innerHTML = out.bijiankeramik()+"Biji".toString();  
        document.getElementById("hgkera").innerHTML = out.formatAngka(kera).toString();
        document.getElementById("jmlsemkera").innerHTML = out.rinci()+"Zak".toString();
        document.getElementById("hgsemkera").innerHTML =out.formatAngka(semen).toString();
        document.getElementById("jmlpaskera").innerHTML = out.pasirkibik()+"m3".toString();
        document.getElementById("hgpaskera").innerHTML = out.formatAngka(pasir).toString();
        document.getElementById("jmlputkera").innerHTML = out.rinciputih()+"Kg".toString();
        document.getElementById("hgputkera").innerHTML = out.formatAngka(semput).toString();
        //total seluruh
        hasil=kera+semen+semput+pasir;
        document.getElementById("totkera").innerHTML = hasil.toString();
        
    }
    else if(jenis == "pengecatan"){
    let out = new cat();
    out.p=datapanjang;
    out.l=datalebar;
    if(select == "cat1"){
        out.hargacatpenutup=100000/5;
        // hargacatpenutup
    }else if(select == "cat2"){
        
        out.hargacatpenutup=118000/5;
    }else{}
    let hasil=0;
    let PlamirT,Catdsr,Catptp,Tkcat:number;
    PlamirT=out.plamir();Catdsr=out.catdasar();Catptp=out.catpenutup();
    Tkcat=out.tukangcat();
    document.getElementById("lblplamir").innerHTML = out.plamirkg().toFixed(1)+"kg";
    document.getElementById("lblplamirr").innerHTML = out.formatAngka(PlamirT).toString();
    document.getElementById("lblcatdsr").innerHTML = out.catdasarkg().toFixed(1)+"kg";
    document.getElementById("lblcatdsrr").innerHTML = out.formatAngka(Catdsr).toString();
    document.getElementById("lblcatptp").innerHTML = out.penutupkg().toFixed(1)+"kg";
    document.getElementById("lblcatptpp").innerHTML = out.formatAngka(Catptp).toString();
    document.getElementById("lbltkcat").innerHTML = out.formatAngka(Tkcat).toString();
    hasil=out.plamir()+out.catdasar()+out.catpenutup()+out.tukangcat();
    document.getElementById("totbiayacat").innerHTML = out.formatAngka(hasil).toString();
    }
    else{}
}
function hitungaci(panjang, lebar){
    let datapanjang,datalebar:number;

    datapanjang=parseFloat((<HTMLInputElement>document.getElementById(panjang)).value);
    datalebar=parseFloat((<HTMLInputElement>document.getElementById(lebar)).value);
        let out = new acian();
        out.p=datapanjang;
        out.l=datalebar;
        let hasil=0;
        let semen:number;
        semen=out.semen();
        document.getElementById("jmlsemaci").innerHTML = out.rinci()+"Zak".toString();  
        document.getElementById("hgsemaci").innerHTML =out.formatAngka(semen).toString();
        
         hasil=semen;
        document.getElementById("totaci").innerHTML = hasil.toString();
}
// function hitungm(volPanjang,vollebar,jenis):void{
//     let datapanjang,datalebar:number;
//     datapanjang=parseFloat((<HTMLInputElement>document.getElementById(volPanjang)).value);
//     datalebar=parseFloat((<HTMLInputElement>document.getElementById(vollebar)).value);
    
//     if(jenis == "pasbata"){
//         let out = new setengahbata();
//         out.p=datapanjang;
//         out.l=datalebar;
//         let hasil=0;
//         let Bata,Semen,perzax,PasirP,Tterampil,Tbatu:number;
//         Bata=out.bata();Semen=out.semen();perzax=out.semenperzax();PasirP=out.pasir();
//         Tterampil=out.terampil();Tbatu=out.tkbatu();
//         document.getElementById("lblPBata").innerHTML =out.bijianbata().toString()+"Biji     "+out.formatAngka(Bata).toString();
//         document.getElementById("lblsemenPBata").innerHTML = out.semenkg().toFixed(1)+"Kg   "+out.rinci().toString()+"Zax   "+out.formatAngka(Semen)+"   "+"("+out.formatAngka(perzax)+"/Zax)".toString();
//         document.getElementById("lblPasirPPBata").innerHTML = out.pasirkibik().toFixed(1)+"m³   "+out.formatAngka(PasirP).toString();
//         document.getElementById("lblPterampilPBata").innerHTML =out.formatAngka(Tterampil).toString();
//         document.getElementById("lblTbatuPBata").innerHTML =out.formatAngka(Tbatu).toString();
//         hasil=out.bata()+out.semen()+out.pasir()+out.terampil()+out.tkbatu();
//         document.getElementById("lbltotalPBata").innerHTML =out.formatAngka(hasil).toString();
//     }
//     else if(jenis == "pasplesteran"){
//         let out = new plesteran();
//         out.p=datapanjang;
//         out.l=datalebar;
//         let hasil=0;
//         let Semen,perzax,PasirP,Tterampil,Tbatu:number;
//         Semen=out.semen();perzax=out.semenperzax();PasirP=out.pasir();
//         Tterampil=out.pekerjaples();Tbatu=out.tbatu();
//         document.getElementById("lblSples").innerHTML = out.semenkg().toFixed(2)+"Kg    "+out.rinci().toString()+"Zax   "+out.formatAngka(Semen)+"("+out.formatAngka(perzax)+"/Zax)".toString();
//         document.getElementById("lblPples").innerHTML = out.pasirkibik().toFixed(2)+"m³   "+out.formatAngka(PasirP).toString();
//         document.getElementById("lblPeples").innerHTML =out.formatAngka(Tterampil).toString();
//         document.getElementById("lblTples").innerHTML = out.formatAngka(Tbatu).toString();
//         hasil=out.semen()+out.pasir()+out.pekerjaples()+out.tbatu();
//         document.getElementById("lbltotpesteran").innerHTML =out.formatAngka(hasil).toString();
                        
//     }
//     else if(jenis == "pasacian"){
//         let out = new acian();
//         out.p=datapanjang;
//         out.l=datalebar;
//         let hasil=0;
//         let Semen,perzax,Tterampil,Tbatu:number;
//         Semen=out.semen();perzax=out.semenperzax();
//         Tterampil=out.pekerja();Tbatu=out.tbatu();
//         document.getElementById("lblPacian").innerHTML = out.semenkg().toString()+"Kg   "+out.rinci().toString()+"Zax   "+out.formatAngka(Semen)+"("+out.formatAngka(perzax)+"/Zax)".toString();
//         document.getElementById("lblPTacian").innerHTML = out.formatAngka(Tterampil).toString();
//         document.getElementById("lblTBacian").innerHTML = out.formatAngka(Tbatu).toString();
//         hasil=out.semen()+out.pekerja()+out.tbatu();
//         document.getElementById("lbltotalacian").innerHTML = out.formatAngka(hasil).toString();
//     }
//     else if(jenis == "paskera"){
//         let out = new keramik();
//         out.p=datapanjang;
//         out.l=datalebar;
//         let hasil=0;
//         let Keramik,Semen,perzax,PasirP,SemenPth,Tterampil,Tbatu:number;
//         Keramik=out.keramik();Semen=out.semen();perzax=out.semenperzax();PasirP=out.pasir();SemenPth=out.semenputih();
//         Tterampil=out.pekerjakera();Tbatu=out.tbatu();
//         document.getElementById("lbltegelPKLantai").innerHTML = out.bijiankeramik().toString()+"Biji   "+out.formatAngka(Keramik).toString();
//         document.getElementById("lblsemenPKLantai").innerHTML = out.semenkg().toFixed(1)+"Kg   "+out.rinci().toString()+"Zax   "+out.formatAngka(Semen)+"("+out.formatAngka(perzax)+"/Zax)".toString();
//         document.getElementById("lblPasirPPKLantai").innerHTML= out.pasirkibik().toFixed(2)+"m³   "+out.formatAngka(PasirP).toString();
//         document.getElementById("lblsemenputPKLantai").innerHTML = out.rinciputih().toFixed(1)+"Kg   "+out.formatAngka(SemenPth).toString();
//         document.getElementById("lblPterampilPKLantai").innerHTML =out.formatAngka(Tterampil).toString();
//         document.getElementById("lblTbatuPKLantai").innerHTML = out.formatAngka(Tbatu).toString();
//         hasil=out.keramik()+out.semen()+out.pasir()+out.semenputih()+out.pekerjakera()+out.tbatu();
//         document.getElementById("totbiayakeramik").innerHTML = out.formatAngka(hasil).toString();
//     }
//     else if(jenis == "pengecatan"){
//         let out = new cat();
//         out.p=datapanjang;
//         out.l=datalebar;
//         let hasil=0;
//         let PlamirT,Catdsr,Catptp,Tkcat:number;
//         PlamirT=out.plamir();Catdsr=out.catdasar();Catptp=out.catpenutup();
//         Tkcat=out.tukangcat();
//         document.getElementById("lblplamir").innerHTML = out.plamirkg().toFixed(1)+"kg";
//         document.getElementById("lblplamirr").innerHTML = out.formatAngka(PlamirT).toString();
//         document.getElementById("lblcatdsr").innerHTML = out.catdasarkg().toFixed(1)+"kg";
//         document.getElementById("lblcatdsrr").innerHTML = out.formatAngka(Catdsr).toString();
//         document.getElementById("lblcatptp").innerHTML = out.penutupkg().toFixed(1)+"kg";
//         document.getElementById("lblcatptpp").innerHTML = out.formatAngka(Catptp).toString();
//         document.getElementById("lbltkcat").innerHTML = out.formatAngka(Tkcat).toString();
//         hasil=out.plamir()+out.catdasar()+out.catpenutup()+out.tukangcat();
//         document.getElementById("totbiayacat").innerHTML = out.formatAngka(hasil).toString();
//     }
//     else{}
// }
function hitungpon(vollebaratas,vollebarbawah,voltinggi,volPanjang,jenis):void
{
    let inputan =new bangunan();
    let datalebaratas,datalebarbawah,datatinggi,datapanjang:number;
    datalebaratas=parseFloat((<HTMLInputElement>document.getElementById(vollebaratas)).value);
    datalebarbawah=parseFloat((<HTMLInputElement>document.getElementById(vollebarbawah)).value);
    datatinggi=parseFloat((<HTMLInputElement>document.getElementById(voltinggi)).value);
    datapanjang=parseFloat((<HTMLInputElement>document.getElementById(volPanjang)).value);
    if(jenis == "pon"){
        let out = new pondasi();
        inputan.la=datalebaratas;
        inputan.lb=datalebarbawah;
        inputan.t=datatinggi;
        inputan.p=datapanjang;
        let hasil:number;
        let Batupch,Semen,perzax,PasirP,Tterampil,Tbatu:number;
        Batupch=out.batupondasi();Semen=out.jumlahsemen();perzax=out.semenperzax();PasirP=out.jumlahpasir();
        Tterampil=out.pekerjapondasi();Tbatu=out.tbatu();
        document.getElementById("lblBPecahPonB").innerHTML = out.batukibik().toFixed(2)+"m³";
        document.getElementById("lblBPecahPonBb").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblsemenPonB").innerHTML =out.semenkg().toFixed(2)+"Kg "+out.rinci().toFixed(1)+"Zax".toString();
        document.getElementById("lblsemenPonBb").innerHTML = out.formatAngka(Semen).toString();
        document.getElementById("lblPasirPPonB").innerHTML = out.pasirkibik().toFixed(2)+"m³".toString();
        document.getElementById("lblPasirPPonBb").innerHTML = out.formatAngka(PasirP).toString();
        document.getElementById("lblPterampilPonB").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbatuPonB").innerHTML = out.formatAngka(Tbatu).toString();
        hasil=out.batupondasi()+out.jumlahpasir()+out.jumlahsemen()+out.pekerjapondasi()+out.tbatu();
        document.getElementById("totbiayapondasi").innerHTML = out.formatAngka(hasil).toString();
    }
}
//let hasil= new dindingTerawangRoster();
//console.log(hasil.pasir());
//console.log(hasil.semen());
//console.log(hasil.roster());
//console.log(hasil.pasir()+hasil.semen()+hasil.roster());
// else if(jenis == "pengecatan"){
//     let out = new cat();
//     out.p=datapanjang;
//     out.l=datalebar;
//     let hasil=0;
//     let PlamirT,Catdsr,Catptp,Tkcat:number;
//     PlamirT=out.plamir();Catdsr=out.catdasar();Catptp=out.catpenutup();
//     Tkcat=out.tukangcat();
//     document.getElementById("lblplamir").innerHTML = out.plamirkg().toFixed(1)+"kg";
//     document.getElementById("lblplamirr").innerHTML = out.formatAngka(PlamirT).toString();
//     document.getElementById("lblcatdsr").innerHTML = out.catdasarkg().toFixed(1)+"kg";
//     document.getElementById("lblcatdsrr").innerHTML = out.formatAngka(Catdsr).toString();
//     document.getElementById("lblcatptp").innerHTML = out.penutupkg().toFixed(1)+"kg";
//     document.getElementById("lblcatptpp").innerHTML = out.formatAngka(Catptp).toString();
//     document.getElementById("lbltkcat").innerHTML = out.formatAngka(Tkcat).toString();
//     hasil=out.plamir()+out.catdasar()+out.catpenutup()+out.tukangcat();
//     document.getElementById("totbiayacat").innerHTML = out.formatAngka(hasil).toString();
// }