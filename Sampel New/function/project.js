var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bangunan = /** @class */ (function () {
    function bangunan() {
        //deklarasi harga bahan
        this.hargaBata = 700;
        this.hargaBatuPecah = 225000;
        this.hargasemengresik = 60000;
        this.hargapasir = 200000;
        this.hargapasirUrug = 150000;
        this.hargasemenPutih = 65000;
        //deklarasi variabel Jasa
        this.hargaPekerja = 70750;
        this.hargaPekerjaTerampil = 73750;
        this.hargaTukangBatu = 80750;
    }
    bangunan.prototype.volume = function (panjang, lebar, tinggi) {
        if (tinggi == undefined) {
            return panjang * lebar * 1; //hitungan volume m2
        }
        else {
            return panjang * lebar * tinggi; //hitungan volume m3
        }
    };
    bangunan.prototype.formatAngka = function (Rupiah) {
        var rev = Rupiah.toString().split('').reverse().join(''), ribuan = rev.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return "Rp." + ribuan;
    };
    //fungsi hitung semen
    bangunan.prototype.semenPC = function () {
        var kg;
        kg = this.hargasemengresik / 40;
        return this.volume(this.p, this.l, this.t) * kg;
    };
    //rinci materaial
    bangunan.prototype.rinciSemen = function (rumus) {
        return (rumus * this.semenPC()) / this.hargasemengresik;
    };
    bangunan.prototype.rinciBatu = function (rumus) {
        return (rumus * this.volume(this.p, this.l, this.t)) / this.hargaBatuPecah;
    };
    bangunan.prototype.rinciPasir = function (rumus) {
        return (rumus * this.volume(this.p, this.l, this.t)) / this.hargapasir;
    };
    bangunan.prototype.rinciUrug = function (rumus) {
        return (rumus * this.volume(this.p, this.l, this.t)) / this.hargapasirUrug;
    };
    //fungsi hitung pasir pasang
    bangunan.prototype.pasirpasang = function () {
        return this.volume(this.p, this.l, this.t) * this.hargapasir;
    };
    //fungsi hitng pasir urug
    bangunan.prototype.pasirUrug = function () {
        return this.volume(this.p, this.l, this.t) * this.hargapasirUrug;
    };
    //fungsi analisa biaya pekerja
    bangunan.prototype.pekerja = function () {
        return this.volume(this.p, this.l, this.t) * this.hargaPekerja;
    };
    bangunan.prototype.pekerjaTerampil = function () {
        return this.volume(this.p, this.l, this.t) * this.hargaPekerjaTerampil;
    };
    bangunan.prototype.tukangbatu = function () {
        return this.volume(this.p, this.l, this.t) * this.hargaTukangBatu;
    };
    return bangunan;
}());
//galian tanah pondasi 1meter
var galian = /** @class */ (function (_super) {
    __extends(galian, _super);
    function galian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    galian.prototype.pekerjagalian = function () {
        return 0.75 * this.pekerja();
    };
    return galian;
}(bangunan));
//urugan 
var Urugan = /** @class */ (function (_super) {
    __extends(Urugan, _super);
    function Urugan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Urugan.prototype.urugkibik = function () {
        return this.rinciUrug(1.2);
    };
    Urugan.prototype.urugan = function () {
        return 1.2 * this.pasirUrug();
    };
    Urugan.prototype.pekerjaurugan = function () {
        return 0.3 * this.pekerja();
    };
    return Urugan;
}(bangunan));
//MEMASANG BATU KOSONG (Aanstampeng) (354)
var anstampeng = /** @class */ (function (_super) {
    __extends(anstampeng, _super);
    function anstampeng() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //batu pecah 15/20
    anstampeng.prototype.Batukibik = function () {
        return this.rinciBatu(1.2);
    };
    anstampeng.prototype.batupecah = function () {
        return 1.2 * this.volume(this.p, this.l, this.t) * this.hargaBatuPecah;
    };
    anstampeng.prototype.urugkibik = function () {
        return this.rinciUrug(0.432);
    };
    anstampeng.prototype.pasirU = function () {
        return 0.432 * this.pasirUrug();
    };
    anstampeng.prototype.terampil = function () {
        return 0.78 * this.pekerjaTerampil();
    };
    anstampeng.prototype.tkbatu = function () {
        return 0.39 * this.tukangbatu();
    };
    return anstampeng;
}(bangunan));
//pondasi 1:3 1:5, 1:8
var pondasi = /** @class */ (function (_super) {
    __extends(pondasi, _super);
    function pondasi() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rumusbatu = 1.2;
        _this.rumussemen = 136;
        _this.rumuspasir = 0.544;
        return _this;
    }
    pondasi.prototype.batukibik = function () {
        return this.rinciBatu(this.rumusbatu);
    };
    pondasi.prototype.batupondasi = function () {
        var total;
        total = this.rumusbatu * this.volume(this.p, this.l, this.t) * this.hargaBatuPecah;
        return this.formatAngka(total);
    };
    pondasi.prototype.rinci = function () {
        return Math.round(this.rinciSemen(this.rumussemen));
    };
    pondasi.prototype.jumlahsemen = function () {
        var total;
        total = this.rumussemen * this.semenPC();
        return this.formatAngka(total);
    };
    pondasi.prototype.pasirkibik = function () {
        return this.rinciPasir(this.rumuspasir);
    };
    pondasi.prototype.jumlahpasir = function () {
        var total;
        total = this.rumuspasir * this.pasirpasang();
        return this.formatAngka(total);
    };
    pondasi.prototype.pekerjapondasi = function () {
        return 1.5 * this.pekerjaTerampil();
    };
    pondasi.prototype.tbatu = function () {
        return 0.75 * this.tukangbatu();
    };
    return pondasi;
}(bangunan));
//PASANGAN DINDING BATA MERAH 1:3, 1:5 1:6 untuk yang campur kapur belum 1:4 yg dipakai
var setengahbata = /** @class */ (function (_super) {
    __extends(setengahbata, _super);
    function setengahbata() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    setengahbata.prototype.batarinci = function () {
        return 70 * this.volume(this.p, this.l, this.t);
    };
    setengahbata.prototype.bata = function () {
        var total;
        total = 70 * this.volume(this.p, this.l, this.t) * this.hargaBata;
        return this.formatAngka(total);
    };
    setengahbata.prototype.rinci = function () {
        var rinci;
        rinci = Math.round(this.rinciSemen(this.rumussemen));
        return rinci;
    };
    setengahbata.prototype.semen = function () {
        var total;
        total = this.rumussemen * this.semenPC();
        return this.formatAngka(total);
    };
    setengahbata.prototype.pasirkibik = function () {
        return this.rinciPasir(this.rumuspasir);
    };
    setengahbata.prototype.pasir = function () {
        var total;
        total = this.rumuspasir * this.pasirpasang();
        return this.formatAngka(total);
    };
    setengahbata.prototype.terampil = function () {
        return 0.3 * this.pekerjaTerampil();
    };
    setengahbata.prototype.tkbatu = function () {
        return 0.1 * this.tukangbatu();
    };
    return setengahbata;
}(bangunan));
//keramik 
var keramik = /** @class */ (function (_super) {
    __extends(keramik, _super);
    function keramik() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    keramik.prototype.keramik = function () {
        var total;
        total = this.rumuskeramik * this.volume(this.p, this.l, this.t) * this.hargaKeramik;
        this.tothgkeramik = total;
        return this.formatAngka(total);
    };
    keramik.prototype.bijiankeramik = function () {
        return this.tothgkeramik / 60000;
    };
    keramik.prototype.semen = function () {
        var total;
        total = this.rumussemen * this.semenPC();
        return this.formatAngka(total);
    };
    keramik.prototype.rinci = function () {
        return Math.round(this.rinciSemen(this.rumussemen));
    };
    keramik.prototype.pasir = function () {
        var total;
        total = 0.045 * this.pasirpasang();
        return this.formatAngka(total);
    };
    keramik.prototype.pasirkibik = function () {
        return this.rinciPasir(0.045);
    };
    //rinci semen putih masih nb=belum
    keramik.prototype.semenputih = function () {
        var tot;
        this.hasil = this.hargasemenPutih / 40;
        tot = this.rumussemenputih * this.volume(this.p, this.l, this.t) * this.hasil;
        this.totsemenputih = tot;
        return this.formatAngka(this.totsemenputih);
    };
    keramik.prototype.rinciputih = function () {
        return this.totsemenputih / this.hasil;
    };
    keramik.prototype.pekerjakera = function () {
        return 0.7 * this.pekerjaTerampil();
    };
    keramik.prototype.tbatu = function () {
        return 0.35 * this.tukangbatu();
    };
    return keramik;
}(bangunan));
//jenis spesifikasi 1pc : 4pp
var dindingTerawangRoster = /** @class */ (function (_super) {
    __extends(dindingTerawangRoster, _super);
    function dindingTerawangRoster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hargaroster = 9000;
        return _this;
    }
    dindingTerawangRoster.prototype.pasir = function () {
        return 0.035 * this.pasirpasang();
    };
    dindingTerawangRoster.prototype.semen = function () {
        return 11 * this.semenPC();
    };
    dindingTerawangRoster.prototype.roster = function () {
        return 30 * this.hargaroster * this.volume(this.p, this.l, this.t);
    };
    return dindingTerawangRoster;
}(bangunan));
//Plesteran 1 PC : 6 PP, Tebal 15 mm
var plesteran = /** @class */ (function (_super) {
    __extends(plesteran, _super);
    function plesteran() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    plesteran.prototype.rinci = function () {
        return this.rinciSemen(this.rumussemen);
    };
    plesteran.prototype.semen = function () {
        var total;
        total = this.rumussemen * this.semenPC();
        return this.formatAngka(total);
    };
    plesteran.prototype.pasirkibik = function () {
        return this.rinciPasir(this.rumuspasir);
    };
    plesteran.prototype.pasir = function () {
        var total;
        total = this.rumuspasir * this.pasirpasang();
        return this.formatAngka(total);
    };
    plesteran.prototype.pekerjaples = function () {
        return 0.3 * this.pekerjaTerampil();
    };
    plesteran.prototype.tbatu = function () {
        return 0.15 * this.tukangbatu();
    };
    return plesteran;
}(bangunan));
//acian
var acian = /** @class */ (function (_super) {
    __extends(acian, _super);
    function acian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    acian.prototype.rinci = function () {
        return this.rinciSemen(3.25);
    };
    acian.prototype.semen = function () {
        var total;
        total = 3.25 * this.semenPC();
        return this.formatAngka(total);
    };
    return acian;
}(bangunan));
function hitung(volPanjang, vollebar, voltinggi, jenis) {
    var inputan = new bangunan();
    var datapanjang, datalebar, datatinggi;
    datapanjang = parseFloat(document.getElementById(volPanjang).value);
    datalebar = parseFloat(document.getElementById(vollebar).value);
    datatinggi = parseFloat(document.getElementById(voltinggi).value);
    if (jenis == "gal") {
        var out = new galian();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        document.getElementById("lblPGalian").innerHTML = out.pekerjagalian().toString();
        hasil = out.pekerjagalian();
        document.getElementById("totbiayagalian").innerHTML = hasil.toString();
    }
    else if (jenis == "tampeng") {
        var out = new anstampeng();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        document.getElementById("lblBPecahAan").innerHTML = out.Batukibik().toString() + "m3   Rp" + out.batupecah().toString();
        document.getElementById("lblTPasirUAan").innerHTML = out.urugkibik().toString() + "m3   Rp" + out.pasirU().toString();
        document.getElementById("lblPterampilAan").innerHTML = out.terampil().toString();
        document.getElementById("lblTbatuAan").innerHTML = out.tkbatu().toString();
        hasil = out.batupecah() + out.pasirU() + out.terampil() + out.tkbatu();
        document.getElementById("totbiayaanstampeng").innerHTML = hasil.toString();
    }
    else if (jenis == "pon") {
        var out = new pondasi();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        document.getElementById("jmlbatupon").innerHTML = out.batukibik() + "m3".toString();
        document.getElementById("hgbatupon").innerHTML = "Rp" + out.batupondasi().toString();
        document.getElementById("jmlsempon").innerHTML = out.rinci() + "Zax".toString();
        document.getElementById("hgsempon").innerHTML = "Rp " + out.jumlahsemen().toString();
        document.getElementById("jmlpaspon").innerHTML = out.pasirkibik() + "m3".toString();
        document.getElementById("hgpaspon").innerHTML = "Rp " + out.jumlahpasir().toString();
        hasil = out.batupondasi() + out.jumlahpasir() + out.jumlahsemen() + out.pekerjapondasi() + out.tbatu();
        document.getElementById("totpon").innerHTML = hasil.toString();
    }
    else if (jenis == "mengurug") {
        var out = new Urugan();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        document.getElementById("lblTUrugPB").innerHTML = out.urugkibik().toString() + "m3   Rp" + out.urugan().toString();
        document.getElementById("lblPUrugPB").innerHTML = out.pekerjaurugan().toString();
        hasil = out.urugan() + out.pekerjaurugan();
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
function hitungm(volPanjang, vollebar, spek, jenis) {
    var datapanjang, datalebar;
    var select;
    select = (document.getElementById(spek).value);
    datapanjang = parseFloat(document.getElementById(volPanjang).value);
    datalebar = parseFloat(document.getElementById(vollebar).value);
    //kondisi spesifikasi
    if (jenis == "pasbata") {
        var out = new setengahbata();
        out.p = datapanjang;
        out.l = datalebar;
        if (select == "bata1") {
            out.rumuspasir = 0.043;
            out.rumussemen = 11.5;
        }
        else if (select == "bata2") {
            out.rumuspasir = 0.049;
            out.rumussemen = 8.32;
        }
        else { }
        var hasil = void 0;
        document.getElementById("jmlbata").innerHTML = out.batarinci() + "Biji".toString();
        document.getElementById("hgbata").innerHTML = "Rp " + out.bata().toString();
        document.getElementById("jmlsembata").innerHTML = out.rinci() + "Zax".toString();
        document.getElementById("hgsembata").innerHTML = " Rp" + out.semen().toString();
        document.getElementById("jmlpasbata").innerHTML = out.pasirkibik() + "m3".toString();
        document.getElementById("hgpasbata").innerHTML = "Rp " + out.pasir().toString();
        hasil = out.bata() + out.semen() + out.pasir() + out.terampil() + out.tkbatu();
        document.getElementById("totbata").innerHTML = hasil.toString();
    }
    else if (jenis == "pasplesteran") {
        var out = new plesteran();
        out.p = datapanjang;
        out.l = datalebar;
        if (select == "ples1") {
            out.rumuspasir = 6.24;
            out.rumussemen = 0.024;
        }
        else if (select == "ples2") {
            out.rumuspasir = 4.416;
            out.rumussemen = 0.027;
        }
        else { }
        var hasil = void 0;
        document.getElementById("jmlsemples").innerHTML = out.rinci() + "Zak".toString();
        document.getElementById("hgsemples").innerHTML = " Rp" + out.semen().toString();
        document.getElementById("jmlpasples").innerHTML = out.pasirkibik() + "m3".toString();
        document.getElementById("hgpasples").innerHTML = " Rp" + out.pasir().toString();
        hasil = out.semen() + out.pasir() + out.pekerjaples() + out.tbatu();
        document.getElementById("totples").innerHTML = hasil.toString();
    }
    else if (jenis == "pasacian") {
        var out = new acian();
        out.p = datapanjang;
        out.l = datalebar;
        var hasil = void 0;
        document.getElementById("jmlsemaci").innerHTML = out.rinci() + "Zak".toString();
        document.getElementById("hgsemaci").innerHTML = " Rp" + out.semen().toString();
        hasil = out.semen();
        document.getElementById("totaci").innerHTML = hasil.toString();
    }
    else if (jenis == "paskera") {
        var out = new keramik();
        out.p = datapanjang;
        out.l = datalebar;
        var hasil = void 0;
        if (select == "kera1") {
            out.hargaKeramik = 38000 / 11;
            out.rumuskeramik = 11.87;
            out.rumussemen = 10;
            out.rumussemenputih = 1.5;
        }
        else if (select == "kera2") {
            out.hargaKeramik = 55000 / 6;
            out.rumuskeramik = 6.63;
            out.rumussemen = 9.8;
            out.rumussemenputih = 1.3;
        }
        else { }
        document.getElementById("jmlkera").innerHTML = out.bijiankeramik() + "Biji".toString();
        document.getElementById("hgkera").innerHTML = "Rp" + out.keramik().toString();
        document.getElementById("jmlsemkera").innerHTML = out.rinci() + "Zak".toString();
        document.getElementById("hgsemkera").innerHTML = "Rp" + out.semen().toString();
        document.getElementById("jmlpaskera").innerHTML = out.pasirkibik() + "m3".toString();
        document.getElementById("hgpaskera").innerHTML = "Rp" + out.pasir().toString();
        document.getElementById("jmlputkera").innerHTML = out.rinciputih() + "Kg".toString();
        document.getElementById("hgputkera").innerHTML = "Rp" + out.semenputih().toString();
        //total seluruh
        hasil = out.keramik() + out.semen() + out.pasir() + out.semenputih();
        document.getElementById("totkera").innerHTML = hasil.toString();
    }
    else { }
}
//let hasil= new dindingTerawangRoster();
//console.log(hasil.pasir());
//console.log(hasil.semen());
//console.log(hasil.roster());
//console.log(hasil.pasir()+hasil.semen()+hasil.roster());
