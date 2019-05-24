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
        //belum ada harga
        this.hargakayu3 = 99000;
        this.hargapaku = 3700;
        this.hargaminyakbek = 10;
        this.hargabesibeton = 10;
        this.hargakawatikatB = 10;
        this.hargapasirbtn = 10;
        this.hargabpecahmesin = 1000;
        this.hargaplywood = 100;
        this.hargadolken = 100;
        this.hargaplamir = 6500;
        this.hargacatdasar = 18000;
        //deklarasi variabel Jasa
        this.hargaPekerja = 65000;
        this.hargaPekerjaTerampil = 73750;
        this.hargaTukangBatu = 80750;
        this.hargaTukangcat = 60000;
    }
    bangunan.prototype.volume = function (panjang, lebar, tinggi) {
        if (tinggi == undefined) {
            return panjang * lebar * 1; //hitungan volume m2
        }
        else {
            return panjang * lebar * tinggi; //hitungan volume m3
        }
    };
    bangunan.prototype.volumepondasi = function (lebaratas, lebarbawah, tinggi, panjang) {
        var hasil;
        hasil = (lebaratas + lebarbawah) / 2;
        return hasil * tinggi * panjang;
        ;
    };
    // fungsi format angka jadi Rupiah
    bangunan.prototype.formatAngka = function (Rupiah) {
        var rev = Rupiah.toString().split('').reverse().join(''), ribuan = rev.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return "Rp." + ribuan;
    };
    //fungsi hitung semen all
    bangunan.prototype.semenPC = function () {
        var kg;
        kg = this.hargasemengresik / 40;
        return this.volume(this.p, this.l, this.t) * kg;
    };
    //fungsi hitung semen khusus pondasi
    bangunan.prototype.semenPCpon = function () {
        var kgpon;
        kgpon = this.hargasemengresik / 40;
        return this.volumepondasi(this.la, this.lb, this.t, this.p) * kgpon;
    };
    //rinci materaial all
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
    //rinci material khusus pondasi
    bangunan.prototype.rinciSemenpon = function (rumus) {
        return (rumus * this.semenPCpon()) / this.hargasemengresik;
    };
    bangunan.prototype.rinciBatupon = function (rumus) {
        return (rumus * this.volumepondasi(this.la, this.lb, this.t, this.p)) / this.hargaBatuPecah;
    };
    bangunan.prototype.rinciPasirpon = function (rumus) {
        return (rumus * this.volumepondasi(this.la, this.lb, this.t, this.p)) / this.hargapasir;
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
        return Math.ceil(0.75 * this.pekerja());
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
        return this.volume(this.p, this.l, this.t) * 1.2;
    };
    Urugan.prototype.urugan = function () {
        return Math.ceil(1.2 * this.pasirUrug());
    };
    Urugan.prototype.pekerjaurugan = function () {
        return Math.ceil(0.3 * this.pekerja());
    };
    return Urugan;
}(bangunan));
//MEMASANG PONDASI BATU KOSONG (Aanstampeng) (354)
var anstampeng = /** @class */ (function (_super) {
    __extends(anstampeng, _super);
    function anstampeng() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //batu pecah 15/20
    anstampeng.prototype.Batukibik = function () {
        return this.volume(this.p, this.l, this.t) * 1.2;
    };
    anstampeng.prototype.batupecah = function () {
        return Math.ceil(1.2 * this.volume(this.p, this.l, this.t) * this.hargaBatuPecah);
    };
    anstampeng.prototype.urugkibik = function () {
        return this.volume(this.p, this.l, this.t) * 0.432;
    };
    anstampeng.prototype.pasirU = function () {
        return Math.ceil(0.432 * this.pasirUrug());
    };
    anstampeng.prototype.terampil = function () {
        return Math.ceil(0.78 * this.pekerjaTerampil());
    };
    anstampeng.prototype.tkbatu = function () {
        return Math.ceil(0.39 * this.tukangbatu());
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
        return this.rumusbatu * this.volumepondasi(this.la, this.lb, this.t, this.p);
    };
    pondasi.prototype.batupondasi = function () {
        return Math.ceil(this.rumusbatu * this.volumepondasi(this.la, this.lb, this.t, this.p) * this.hargaBatuPecah);
    };
    pondasi.prototype.semenkg = function () {
        return this.rinciSemenpon(this.rumussemen) * 40;
    };
    pondasi.prototype.semenperzax = function () {
        return Math.ceil(this.jumlahsemen() / this.rinci());
    };
    pondasi.prototype.rinci = function () {
        return Math.ceil(this.rinciSemenpon(this.rumussemen));
    };
    pondasi.prototype.jumlahsemen = function () {
        return Math.ceil(this.rumussemen * this.semenPCpon());
    };
    pondasi.prototype.pasirkibik = function () {
        return this.rumuspasir * this.volumepondasi(this.la, this.lb, this.t, this.p);
    };
    pondasi.prototype.jumlahpasir = function () {
        return Math.ceil(this.rumuspasir * this.volumepondasi(this.la, this.lb, this.t, this.p) * this.hargapasir);
    };
    pondasi.prototype.pekerjapondasi = function () {
        return Math.ceil(1.5 * this.volumepondasi(this.la, this.lb, this.t, this.p) * this.hargaPekerjaTerampil);
    };
    pondasi.prototype.tbatu = function () {
        return Math.ceil(0.75 * this.volumepondasi(this.la, this.lb, this.t, this.p) * this.hargaTukangBatu);
    };
    return pondasi;
}(bangunan));
//PASANGAN DINDING BATA MERAH 1:3, 1:5 1:6 untuk yang campur kapur belum 1:4 yg dipakai
var setengahbata = /** @class */ (function (_super) {
    __extends(setengahbata, _super);
    function setengahbata() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    setengahbata.prototype.bata = function () {
        return 70 * this.volume(this.p, this.l, this.t) * this.hargaBata;
    };
    setengahbata.prototype.bijianbata = function () {
        return Math.ceil(this.bata() / 700);
    };
    setengahbata.prototype.semenkg = function () {
        return this.rinciSemen(this.rumussemen) * 40;
    };
    setengahbata.prototype.semenperzax = function () {
        return Math.ceil(this.semen() / this.rinci());
    };
    setengahbata.prototype.rinci = function () {
        return Math.ceil(this.rinciSemen(this.rumussemen));
    };
    setengahbata.prototype.semen = function () {
        return (this.rumussemen * this.semenPC());
    };
    setengahbata.prototype.pasirkibik = function () {
        return this.volume(this.p, this.l, this.t) * (this.rumuspasir);
    };
    setengahbata.prototype.pasir = function () {
        return Math.ceil(this.rumuspasir * this.pasirpasang());
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
        return Math.ceil(this.rumuskeramik * this.volume(this.p, this.l, this.t) * this.hargaKeramik);
    };
    keramik.prototype.bijiankeramik = function () {
        return Math.ceil(this.keramik() / 60000 * 6);
    };
    keramik.prototype.semenkg = function () {
        return this.rinciSemen(this.rumussemen) * 40;
    };
    keramik.prototype.semenperzax = function () {
        return Math.ceil(this.semen() / this.rinci());
    };
    keramik.prototype.semen = function () {
        return Math.ceil(this.rumussemen * this.semenPC());
    };
    keramik.prototype.rinci = function () {
        return Math.ceil(this.rinciSemen(this.rumussemen));
    };
    keramik.prototype.pasir = function () {
        return 0.045 * this.pasirpasang();
    };
    keramik.prototype.pasirkibik = function () {
        return this.volume(this.p, this.l, this.t) * 0.045;
    };
    //rinci semen putih masih nb=belum
    keramik.prototype.semenputih = function () {
        var tot;
        this.hasil = this.hargasemenPutih / 40;
        tot = Math.ceil(this.rumussemenputih * this.volume(this.p, this.l, this.t) * this.hasil);
        return tot;
    };
    keramik.prototype.rinciputih = function () {
        return (this.semenputih() / this.hasil);
    };
    keramik.prototype.pekerjakera = function () {
        return Math.ceil(0.7 * this.pekerjaTerampil());
    };
    keramik.prototype.tbatu = function () {
        return Math.ceil(0.35 * this.tukangbatu());
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
    plesteran.prototype.semenperzax = function () {
        return Math.ceil(this.semen() / this.rinci());
    };
    plesteran.prototype.rinci = function () {
        return Math.ceil(this.rinciSemen(this.rumussemen));
    };
    plesteran.prototype.semenkg = function () {
        return this.rinciSemen(this.rumussemen) * 40;
    };
    plesteran.prototype.semen = function () {
        return Math.ceil(this.rumussemen * this.semenPC());
    };
    plesteran.prototype.pasirkibik = function () {
        return this.volume(this.p, this.l, this.t) * this.rumuspasir;
    };
    plesteran.prototype.pasir = function () {
        return this.rumuspasir * this.pasirpasang();
    };
    plesteran.prototype.pekerjaples = function () {
        return Math.ceil(0.3 * this.pekerjaTerampil());
    };
    plesteran.prototype.tbatu = function () {
        return Math.ceil(0.15 * this.tukangbatu());
    };
    return plesteran;
}(bangunan));
//acian
var acian = /** @class */ (function (_super) {
    __extends(acian, _super);
    function acian() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    acian.prototype.semenperzax = function () {
        return Math.ceil(this.semen() / this.rinci());
    };
    acian.prototype.rinci = function () {
        return Math.ceil(this.rinciSemen(3.25));
    };
    acian.prototype.semenkg = function () {
        return this.rinciSemen(3.25) * 40;
    };
    acian.prototype.semen = function () {
        return Math.ceil(3.25 * this.semenPC());
    };
    acian.prototype.pekerja = function () {
        return Math.ceil(0.2 * this.pekerjaTerampil());
    };
    acian.prototype.tbatu = function () {
        return Math.ceil(0.1 * this.tukangbatu());
    };
    return acian;
}(bangunan));
//pasangan sloof (Sloof Beton Bertulang (200 kg besi + bekisting) (978))
var sloff = /** @class */ (function (_super) {
    __extends(sloff, _super);
    function sloff() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    sloff.prototype.kayu = function () {
        return Math.ceil(0.27 * this.hargakayu3 * this.volume(this.p, this.l, this.t));
    };
    sloff.prototype.meterkayu = function () {
        return this.volume(this.p, this.l, this.t) * 0.27;
    };
    sloff.prototype.paku = function () {
        return Math.ceil(2 * this.hargapaku * this.volume(this.p, this.l, this.t));
    };
    sloff.prototype.kgpaku = function () {
        return 2 * this.volume(this.p, this.l, this.t);
    };
    sloff.prototype.minyakbek = function () {
        return Math.ceil(0.6 * this.hargaminyakbek * this.volume(this.p, this.l, this.t));
    };
    sloff.prototype.literminyak = function () {
        return 0.6 * this.volume(this.p, this.l, this.t);
    };
    sloff.prototype.besibetonp = function () {
        return Math.ceil(210 * this.hargabesibeton * this.volume(this.p, this.l, this.t));
    };
    sloff.prototype.kgbesi = function () {
        return 210 * this.volume(this.p, this.l, this.t);
    };
    sloff.prototype.kawatikatB = function () {
        return Math.ceil(3 * this.hargakawatikatB * this.volume(this.p, this.l, this.t));
    };
    sloff.prototype.kgkawat = function () {
        return 3 * this.volume(this.p, this.l, this.t);
    };
    sloff.prototype.semen = function () {
        return Math.ceil(336 * this.semenPC());
    };
    sloff.prototype.rinci = function () {
        return Math.ceil(this.rinciSemen(336));
    };
    sloff.prototype.semenkg = function () {
        return this.rinciSemen(336) * 40;
    };
    sloff.prototype.semenperzax = function () {
        return Math.ceil(this.semen() / this.rinci());
    };
    sloff.prototype.pasirbeton = function () {
        return Math.ceil(0.54 * this.hargapasirbtn * this.volume(this.p, this.l, this.t));
    };
    sloff.prototype.meterpasir = function () {
        return this.volume(this.p, this.l, this.t) * 0.54;
    };
    sloff.prototype.Batukibik = function () {
        return this.volume(this.p, this.l, this.t) * 0.81;
    };
    sloff.prototype.batupecah = function () {
        return Math.ceil(0.81 * this.hargabpecahmesin * this.volume(this.p, this.l, this.t));
    };
    sloff.prototype.pekerja = function () {
        return Math.ceil(0.52 * this.pekerjaTerampil());
    };
    sloff.prototype.tbatu = function () {
        return Math.ceil(0.26 * this.tukangbatu());
    };
    return sloff;
}(bangunan));
//pasangan kolom (Kolom Beton Bertulang (300 kg besi + bekisting)(999))
var kolom = /** @class */ (function (_super) {
    __extends(kolom, _super);
    function kolom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    kolom.prototype.kayu = function () {
        return Math.ceil(0.4 * this.hargakayu3 * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.meterkayu = function () {
        return this.volume(this.p, this.l, this.t) * 0.4;
    };
    kolom.prototype.paku = function () {
        return Math.ceil(4 * this.hargapaku * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.kgpaku = function () {
        return 4 * this.volume(this.p, this.l, this.t);
    };
    kolom.prototype.minyakbek = function () {
        return Math.ceil(2 * this.hargaminyakbek * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.literminyak = function () {
        return 2 * this.volume(this.p, this.l, this.t);
    };
    kolom.prototype.besibetonp = function () {
        return Math.ceil(315 * this.hargabesibeton * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.kgbesi = function () {
        return 315 * this.volume(this.p, this.l, this.t);
    };
    kolom.prototype.kawatikatB = function () {
        return Math.ceil(4.5 * this.hargakawatikatB * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.kgkawat = function () {
        return 4.5 * this.volume(this.p, this.l, this.t);
    };
    kolom.prototype.semen = function () {
        return Math.ceil(336 * this.semenPC());
    };
    kolom.prototype.rinci = function () {
        return Math.ceil(this.rinciSemen(336));
    };
    kolom.prototype.semenperzax = function () {
        return Math.ceil(this.semen() / this.rinci());
    };
    kolom.prototype.semenkg = function () {
        return this.rinciSemen(336) * 40;
    };
    kolom.prototype.pasirbeton = function () {
        return Math.ceil(0.54 * this.hargapasirbtn * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.meterpasir = function () {
        return this.volume(this.p, this.l, this.t) * 0.54;
    };
    kolom.prototype.batupecah = function () {
        return Math.ceil(0.81 * this.hargabpecahmesin * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.Batukibik = function () {
        return this.volume(this.p, this.l, this.t) * 0.81;
    };
    kolom.prototype.kayuu = function () {
        return Math.ceil(0.15 * this.hargakayu3 * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.meterkayuu = function () {
        return this.volume(this.p, this.l, this.t) * 0.15;
    };
    kolom.prototype.plywood = function () {
        return Math.ceil(3.5 * this.hargaplywood * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.lbrplywood = function () {
        return this.volume(this.p, this.l, this.t) * 3.5;
    };
    kolom.prototype.dolkenkayu = function () {
        return Math.ceil(20 * this.hargadolken * this.volume(this.p, this.l, this.t));
    };
    kolom.prototype.btgdolken = function () {
        return this.volume(this.p, this.l, this.t) * 20;
    };
    kolom.prototype.pekerja = function () {
        return Math.ceil(7.05 * this.pekerjaTerampil());
    };
    kolom.prototype.tbatu = function () {
        return Math.ceil(0.275 * this.tukangbatu());
    };
    return kolom;
}(bangunan));
//pasangan balok - disamakan dengan sloof karena sloof bawah & balok atas 
//(Sloof Beton Bertulang (200 kg besi + bekisting) (978))
var balok = /** @class */ (function (_super) {
    __extends(balok, _super);
    function balok() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    balok.prototype.kayu = function () {
        return Math.ceil(0.27 * this.hargakayu3 * this.volume(this.p, this.l, this.t));
    };
    balok.prototype.meterkayu = function () {
        return this.volume(this.p, this.l, this.t) * 0.27;
    };
    balok.prototype.paku = function () {
        return Math.ceil(2 * this.hargapaku * this.volume(this.p, this.l, this.t));
    };
    balok.prototype.kgpaku = function () {
        return 2 * this.volume(this.p, this.l, this.t);
    };
    balok.prototype.minyakbek = function () {
        return Math.ceil(0.6 * this.hargaminyakbek * this.volume(this.p, this.l, this.t));
    };
    balok.prototype.literminyak = function () {
        return 0.6 * this.volume(this.p, this.l, this.t);
    };
    balok.prototype.besibetonp = function () {
        return Math.ceil(210 * this.hargabesibeton * this.volume(this.p, this.l, this.t));
    };
    balok.prototype.kgbesi = function () {
        return 210 * this.volume(this.p, this.l, this.t);
    };
    balok.prototype.kawatikatB = function () {
        return Math.ceil(3 * this.hargakawatikatB * this.volume(this.p, this.l, this.t));
    };
    balok.prototype.kgkawat = function () {
        return 3 * this.volume(this.p, this.l, this.t);
    };
    balok.prototype.semen = function () {
        return Math.ceil(336 * this.semenPC());
    };
    balok.prototype.rinci = function () {
        return Math.ceil(this.rinciSemen(336));
    };
    balok.prototype.semenkg = function () {
        return this.rinciSemen(336) * 40;
    };
    balok.prototype.semenperzax = function () {
        return Math.ceil(this.semen() / this.rinci());
    };
    balok.prototype.pasirbeton = function () {
        return Math.ceil(0.54 * this.hargapasirbtn * this.volume(this.p, this.l, this.t));
    };
    balok.prototype.meterpasir = function () {
        return this.volume(this.p, this.l, this.t) * 0.54;
    };
    balok.prototype.Batukibik = function () {
        return this.volume(this.p, this.l, this.t) * 0.81;
    };
    balok.prototype.batupecah = function () {
        return Math.ceil(0.81 * this.hargabpecahmesin * this.volume(this.p, this.l, this.t));
    };
    balok.prototype.pekerja = function () {
        return Math.ceil(0.52 * this.pekerjaTerampil());
    };
    balok.prototype.tbatu = function () {
        return Math.ceil(0.26 * this.tukangbatu());
    };
    return balok;
}(bangunan));
var cat = /** @class */ (function (_super) {
    __extends(cat, _super);
    function cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    cat.prototype.plamir = function () {
        return Math.ceil(this.volume(this.p, this.l, this.t) * 0.1 * this.hargaplamir);
    };
    cat.prototype.plamirkg = function () {
        return this.volume(this.p, this.l, this.t) * 0.1;
    };
    cat.prototype.catdasar = function () {
        return Math.ceil(this.volume(this.p, this.l, this.t) * 0.1 * this.hargacatdasar);
    };
    cat.prototype.catdasarkg = function () {
        return this.volume(this.p, this.l, this.t) * 0.1;
    };
    cat.prototype.catpenutup = function () {
        return Math.ceil(this.volume(this.p, this.l, this.t) * 0.26 * this.hargacatpenutup);
    };
    cat.prototype.penutupkg = function () {
        return this.volume(this.p, this.l, this.t) * 0.26;
    };
    cat.prototype.tukangcat = function () {
        return Math.ceil(this.volume(this.p, this.l, this.t) * 0.063 * this.hargaTukangcat);
    };
    return cat;
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
        var Pgalian = void 0;
        Pgalian = out.pekerjagalian();
        document.getElementById("lblPGalian").innerHTML = out.formatAngka(Pgalian).toString();
        hasil = out.pekerjagalian();
        document.getElementById("totbiayagalian").innerHTML = out.formatAngka(hasil).toString();
    }
    else if (jenis == "tampeng") {
        var out = new anstampeng();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        var Batupch = void 0, PasirU = void 0, Tterampil = void 0, Tbatu = void 0;
        Batupch = out.batupecah();
        PasirU = out.pasirU();
        Tterampil = out.terampil();
        Tbatu = out.tkbatu();
        document.getElementById("lblBPecahAan").innerHTML = out.Batukibik().toFixed(1) + "m³   " + out.formatAngka(Batupch).toString();
        document.getElementById("lblTPasirUAan").innerHTML = out.urugkibik().toFixed(2) + "m³   " + out.formatAngka(PasirU).toString();
        document.getElementById("lblPterampilAan").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbatuAan").innerHTML = out.formatAngka(Tbatu).toString();
        hasil = out.batupecah() + out.pasirU() + out.terampil() + out.tkbatu();
        document.getElementById("totbiayaanstampeng").innerHTML = out.formatAngka(hasil).toString();
    }
    else if (jenis == "mengurug") {
        var out = new Urugan();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        var PasirU = void 0, TUrugan = void 0;
        PasirU = out.urugan();
        TUrugan = out.pekerjaurugan();
        document.getElementById("lblTUrugPB").innerHTML = out.urugkibik().toFixed(1) + "m³   " + out.formatAngka(PasirU).toString();
        document.getElementById("lblPUrugPB").innerHTML = out.formatAngka(TUrugan).toString();
        hasil = out.urugan() + out.pekerjaurugan();
        document.getElementById("lbltotalurugan").innerHTML = out.formatAngka(hasil).toString();
    }
    else if (jenis == "ringsloff") {
        var out = new sloff();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        var Kayu = void 0, Paku = void 0, Minyak = void 0, Besi = void 0, Kawat = void 0, Semen = void 0, perzax = void 0, Pasir = void 0, Batupch = void 0, Tterampil = void 0, Tbatu = void 0;
        Kayu = out.kayu();
        Paku = out.paku();
        Minyak = out.minyakbek();
        Besi = out.besibetonp();
        Kawat = out.kawatikatB();
        Semen = out.semen();
        perzax = out.semenperzax();
        Pasir = out.pasirbeton();
        Batupch = out.batupecah();
        Tterampil = out.pekerja();
        Tbatu = out.tbatu();
        document.getElementById("lblKayusloof").innerHTML = out.meterkayu().toFixed(2) + "m³";
        document.getElementById("lblKayuslooff").innerHTML = out.formatAngka(Kayu).toString();
        document.getElementById("lblPakusloof").innerHTML = out.kgpaku().toFixed(1) + "Kg";
        document.getElementById("lblPakuslooff").innerHTML = out.formatAngka(Paku).toString();
        document.getElementById("lblminyakbeksloof").innerHTML = out.literminyak().toFixed(1) + "Liter";
        document.getElementById("lblminyakbekslooff").innerHTML = out.formatAngka(Minyak).toString();
        document.getElementById("lblbesibpsloof").innerHTML = out.kgbesi().toFixed(1) + "Kg";
        document.getElementById("lblbesibpslooff").innerHTML = out.formatAngka(Besi).toString();
        document.getElementById("lblkawatsloof").innerHTML = out.kgkawat().toFixed(1) + "Kg";
        document.getElementById("lblkawatslooff").innerHTML = out.formatAngka(Kawat).toString();
        document.getElementById("lblsemensloof").innerHTML = out.semenkg().toFixed(1) + "kg   " + out.rinci().toString() + "Zax";
        document.getElementById("lblsemenslooff").innerHTML = out.formatAngka(Semen).toString();
        document.getElementById("lblpasirsloof").innerHTML = out.meterpasir().toFixed(2) + "m³";
        document.getElementById("lblpasirslooff").innerHTML = out.formatAngka(Pasir).toString();
        document.getElementById("lblbpsloof").innerHTML = out.Batukibik().toFixed(2) + "m³";
        document.getElementById("lblbpslooff").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblPsloof").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbsloof").innerHTML = out.formatAngka(Tbatu).toString();
        hasil = out.kayu() + out.paku() + out.minyakbek() + out.besibetonp() + out.kawatikatB() + out.semen() +
            out.pasirbeton() + out.batupecah() + out.pekerja() + out.tbatu();
        document.getElementById("lbltotalsloof").innerHTML = out.formatAngka(hasil).toString();
    }
    else if (jenis == "ringkolom") {
        var out = new kolom();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        var Kayu = void 0, Paku = void 0, Minyak = void 0, Besi = void 0, Kawat = void 0, Semen = void 0, perzax = void 0, Pasir = void 0, Batupch = void 0, Kayuu = void 0, Ply = void 0, Dolken = void 0, Tterampil = void 0, Tbatu = void 0;
        Kayu = out.kayu();
        Paku = out.paku();
        Minyak = out.minyakbek();
        Besi = out.besibetonp();
        Kawat = out.kawatikatB();
        Semen = out.semen();
        perzax = out.semenperzax();
        Pasir = out.pasirbeton();
        Batupch = out.batupecah();
        Kayuu = out.kayuu();
        Ply = out.plywood();
        Dolken = out.dolkenkayu();
        Tterampil = out.pekerja();
        Tbatu = out.tbatu();
        document.getElementById("lblKayukolom").innerHTML = out.meterkayu().toFixed(2) + "m³";
        document.getElementById("lblKayukolomm").innerHTML = out.formatAngka(Kayu).toString();
        document.getElementById("lblPakukolom").innerHTML = out.kgpaku().toFixed(1) + "Kg";
        document.getElementById("lblPakukolomm").innerHTML = out.formatAngka(Paku).toString();
        document.getElementById("lblminyakbekkolom").innerHTML = out.literminyak().toFixed(1) + "Liter";
        document.getElementById("lblminyakbekkolomm").innerHTML = out.formatAngka(Minyak).toString();
        document.getElementById("lblbesibpkolom").innerHTML = out.kgbesi().toFixed(1) + "Kg";
        document.getElementById("lblbesibpkolomm").innerHTML = out.formatAngka(Besi).toString();
        document.getElementById("lblkawatkolom").innerHTML = out.kgkawat().toFixed(1) + "Kg";
        document.getElementById("lblkawatkolomm").innerHTML = out.formatAngka(Kawat).toString();
        document.getElementById("lblsemenkolom").innerHTML = out.semenkg().toFixed(1) + "kg   " + out.rinci().toString() + "Zax";
        document.getElementById("lblsemenkolomm").innerHTML = out.formatAngka(Semen).toString();
        document.getElementById("lblpasirkolom").innerHTML = out.meterpasir().toFixed(2) + "m³";
        document.getElementById("lblpasirkolomm").innerHTML = out.formatAngka(Pasir).toString();
        document.getElementById("lblbpkolom").innerHTML = out.Batukibik().toFixed(2) + "m³";
        document.getElementById("lblbpkolomm").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblKayuduakolom").innerHTML = out.meterkayuu().toFixed(2) + "m³";
        document.getElementById("lblKayuduakolomm").innerHTML = out.formatAngka(Kayuu).toString();
        document.getElementById("lblplykolom").innerHTML = out.lbrplywood().toString() + "lembar";
        document.getElementById("lblplykolomm").innerHTML = out.formatAngka(Ply).toString();
        document.getElementById("lbldolkenkolom").innerHTML = out.btgdolken().toString() + "batang";
        document.getElementById("lbldolkenkolomm").innerHTML = out.formatAngka(Dolken).toString();
        document.getElementById("lblPkolom").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbkolom").innerHTML = out.formatAngka(Tbatu).toString();
        hasil = out.kayu() + out.paku() + out.minyakbek() + out.besibetonp() + out.kawatikatB() + out.semen() +
            out.pasirbeton() + out.batupecah() + out.kayuu() + out.plywood() + out.dolkenkayu() + out.pekerja() + out.tbatu();
        document.getElementById("lbltotalkolom").innerHTML = out.formatAngka(hasil).toString();
    }
    else if (jenis == "ringbalok") {
        var out = new balok();
        out.p = datapanjang;
        out.l = datalebar;
        out.t = datatinggi;
        var hasil = void 0;
        var Kayu = void 0, Paku = void 0, Minyak = void 0, Besi = void 0, Kawat = void 0, Semen = void 0, perzax = void 0, Pasir = void 0, Batupch = void 0, Tterampil = void 0, Tbatu = void 0;
        Kayu = out.kayu();
        Paku = out.paku();
        Minyak = out.minyakbek();
        Besi = out.besibetonp();
        Kawat = out.kawatikatB();
        Semen = out.semen();
        perzax = out.semenperzax();
        Pasir = out.pasirbeton();
        Batupch = out.batupecah();
        Tterampil = out.pekerja();
        Tbatu = out.tbatu();
        document.getElementById("lblKayubalok").innerHTML = out.meterkayu().toFixed(2) + "m³";
        document.getElementById("lblKayubalokk").innerHTML = out.formatAngka(Kayu).toString();
        document.getElementById("lblPakubalok").innerHTML = out.kgpaku().toFixed(1) + "Kg";
        document.getElementById("lblPakubalokk").innerHTML = out.formatAngka(Paku).toString();
        document.getElementById("lblminyakbekbalok").innerHTML = out.literminyak().toFixed(1) + "Liter";
        document.getElementById("lblminyakbekbalokk").innerHTML = out.formatAngka(Minyak).toString();
        document.getElementById("lblbesibpbalok").innerHTML = out.kgbesi().toFixed(1) + "Kg";
        document.getElementById("lblbesibpbalokk").innerHTML = out.formatAngka(Besi).toString();
        document.getElementById("lblkawatbalok").innerHTML = out.kgkawat().toFixed(1) + "Kg";
        document.getElementById("lblkawatbalokk").innerHTML = out.formatAngka(Kawat).toString();
        document.getElementById("lblsemenbalok").innerHTML = out.semenkg().toFixed(1) + "kg   " + out.rinci().toString() + "Zax";
        document.getElementById("lblsemenbalokk").innerHTML = out.formatAngka(Semen).toString();
        document.getElementById("lblpasirbalok").innerHTML = out.meterpasir().toFixed(2) + "m³";
        document.getElementById("lblpasirbalokk").innerHTML = out.formatAngka(Pasir).toString();
        document.getElementById("lblbpbalok").innerHTML = out.Batukibik().toFixed(2) + "m³";
        document.getElementById("lblbpbalokk").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblPbalok").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbbalok").innerHTML = out.formatAngka(Tbatu).toString();
        hasil = out.kayu() + out.paku() + out.minyakbek() + out.besibetonp() + out.kawatikatB() + out.semen() +
            out.pasirbeton() + out.batupecah() + out.pekerja() + out.tbatu();
        document.getElementById("lbltotalbalok").innerHTML = out.formatAngka(hasil).toString();
    }
    else { }
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
        var hasil = 0;
        var bata = void 0, semen = void 0, pasir = void 0;
        bata = out.bata();
        semen = out.semen();
        pasir = out.pasir();
        document.getElementById("jmlbata").innerHTML = out.bijianbata().toString() + "Biji";
        document.getElementById("hgbata").innerHTML = out.formatAngka(bata).toString();
        document.getElementById("jmlsembata").innerHTML = out.rinci().toString() + "Zax";
        document.getElementById("hgsembata").innerHTML = out.formatAngka(semen).toString();
        document.getElementById("jmlpasbata").innerHTML = out.pasirkibik().toFixed(1) + "m3";
        document.getElementById("hgpasbata").innerHTML = out.formatAngka(pasir).toString();
        hasil = semen + bata + pasir;
        document.getElementById("totbata").innerHTML = hasil.toString();
    }
    else if (jenis == "pasplesteran") {
        var out = new plesteran();
        out.p = datapanjang;
        out.l = datalebar;
        if (select == "ples1") {
            out.rumussemen = 6.24;
            out.rumuspasir = 0.024;
        }
        else if (select == "ples2") {
            out.rumussemen = 4.416;
            out.rumuspasir = 0.027;
        }
        else { }
        var hasil = 0;
        var semen = void 0, pasir = void 0;
        semen = out.semen();
        pasir = out.pasir();
        document.getElementById("jmlsemples").innerHTML = out.rinci() + "Zak".toString();
        document.getElementById("hgsemples").innerHTML = out.formatAngka(semen).toString();
        document.getElementById("jmlpasples").innerHTML = out.pasirkibik() + "m3".toString();
        document.getElementById("hgpasples").innerHTML = out.formatAngka(pasir).toString();
        hasil = semen + pasir;
        document.getElementById("totples").innerHTML = hasil.toString();
    }
    else if (jenis == "paskera") {
        var out = new keramik();
        out.p = datapanjang;
        out.l = datalebar;
        var hasil = 0;
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
        var kera = void 0, semput = void 0, semen = void 0, pasir = void 0;
        kera = out.keramik();
        semen = out.semen();
        semput = out.semenputih();
        pasir = out.pasir();
        document.getElementById("jmlkera").innerHTML = out.bijiankeramik() + "Biji".toString();
        document.getElementById("hgkera").innerHTML = out.formatAngka(kera).toString();
        document.getElementById("jmlsemkera").innerHTML = out.rinci() + "Zak".toString();
        document.getElementById("hgsemkera").innerHTML = out.formatAngka(semen).toString();
        document.getElementById("jmlpaskera").innerHTML = out.pasirkibik() + "m3".toString();
        document.getElementById("hgpaskera").innerHTML = out.formatAngka(pasir).toString();
        document.getElementById("jmlputkera").innerHTML = out.rinciputih() + "Kg".toString();
        document.getElementById("hgputkera").innerHTML = out.formatAngka(semput).toString();
        //total seluruh
        hasil = kera + semen + semput + pasir;
        document.getElementById("totkera").innerHTML = hasil.toString();
    }
    else if (jenis == "pengecatan") {
        var out = new cat();
        out.p = datapanjang;
        out.l = datalebar;
        if (select == "cat1") {
            out.hargacatpenutup = 100000 / 5;
            // hargacatpenutup
        }
        else if (select == "cat2") {
            out.hargacatpenutup = 118000 / 5;
        }
        else { }
        var hasil = 0;
        var PlamirT = void 0, Catdsr = void 0, Catptp = void 0, Tkcat = void 0;
        PlamirT = out.plamir();
        Catdsr = out.catdasar();
        Catptp = out.catpenutup();
        Tkcat = out.tukangcat();
        document.getElementById("lblplamir").innerHTML = out.plamirkg().toFixed(1) + "kg";
        document.getElementById("lblplamirr").innerHTML = out.formatAngka(PlamirT).toString();
        document.getElementById("lblcatdsr").innerHTML = out.catdasarkg().toFixed(1) + "kg";
        document.getElementById("lblcatdsrr").innerHTML = out.formatAngka(Catdsr).toString();
        document.getElementById("lblcatptp").innerHTML = out.penutupkg().toFixed(1) + "kg";
        document.getElementById("lblcatptpp").innerHTML = out.formatAngka(Catptp).toString();
        document.getElementById("lbltkcat").innerHTML = out.formatAngka(Tkcat).toString();
        hasil = out.plamir() + out.catdasar() + out.catpenutup() + out.tukangcat();
        document.getElementById("totbiayacat").innerHTML = out.formatAngka(hasil).toString();
    }
    else { }
}
function hitungaci(panjang, lebar) {
    var datapanjang, datalebar;
    datapanjang = parseFloat(document.getElementById(panjang).value);
    datalebar = parseFloat(document.getElementById(lebar).value);
    var out = new acian();
    out.p = datapanjang;
    out.l = datalebar;
    var hasil = 0;
    var semen;
    semen = out.semen();
    document.getElementById("jmlsemaci").innerHTML = out.rinci() + "Zak".toString();
    document.getElementById("hgsemaci").innerHTML = out.formatAngka(semen).toString();
    hasil = semen;
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
function hitungpon(vollebaratas, vollebarbawah, voltinggi, volPanjang, jenis) {
    var inputan = new bangunan();
    var datalebaratas, datalebarbawah, datatinggi, datapanjang;
    datalebaratas = parseFloat(document.getElementById(vollebaratas).value);
    datalebarbawah = parseFloat(document.getElementById(vollebarbawah).value);
    datatinggi = parseFloat(document.getElementById(voltinggi).value);
    datapanjang = parseFloat(document.getElementById(volPanjang).value);
    if (jenis == "pon") {
        var out = new pondasi();
        inputan.la = datalebaratas;
        inputan.lb = datalebarbawah;
        inputan.t = datatinggi;
        inputan.p = datapanjang;
        var hasil = void 0;
        var Batupch = void 0, Semen = void 0, perzax = void 0, PasirP = void 0, Tterampil = void 0, Tbatu = void 0;
        Batupch = out.batupondasi();
        Semen = out.jumlahsemen();
        perzax = out.semenperzax();
        PasirP = out.jumlahpasir();
        Tterampil = out.pekerjapondasi();
        Tbatu = out.tbatu();
        document.getElementById("lblBPecahPonB").innerHTML = out.batukibik().toFixed(2) + "m³";
        document.getElementById("lblBPecahPonBb").innerHTML = out.formatAngka(Batupch).toString();
        document.getElementById("lblsemenPonB").innerHTML = out.semenkg().toFixed(2) + "Kg " + out.rinci().toFixed(1) + "Zax".toString();
        document.getElementById("lblsemenPonBb").innerHTML = out.formatAngka(Semen).toString();
        document.getElementById("lblPasirPPonB").innerHTML = out.pasirkibik().toFixed(2) + "m³".toString();
        document.getElementById("lblPasirPPonBb").innerHTML = out.formatAngka(PasirP).toString();
        document.getElementById("lblPterampilPonB").innerHTML = out.formatAngka(Tterampil).toString();
        document.getElementById("lblTbatuPonB").innerHTML = out.formatAngka(Tbatu).toString();
        hasil = out.batupondasi() + out.jumlahpasir() + out.jumlahsemen() + out.pekerjapondasi() + out.tbatu();
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
