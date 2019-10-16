export class Rule {
  constructor() {
    this.categoryid = 15;
    this.brand = null;
    this.model = null;
    this.config = null;
    this.type = null;
    this.images = [];
  }
  DelImage(img) {
    this.images = this.images.filter(i => i.scl_imageid !== img.scl_imageid);
    this.UpdateMultiple();
  }
  AddImage(img) {
    this.DelImage(img);
    this.images.push(img);
    this.UpdateMultiple();
  }

  UpdateMultiple() {    
    this.brand  = null;
    this.model  = null;
    this.config = null;
    this.type   = null;

    this.images.forEach(img => {
      if (this.brand === null) this.brand = img.merk;
      else if (this.brand !== img.merk) this.brand = "***";

      if (this.model === null) this.model = img.handelsbenaming;
      else if (this.model !== img.handelsbenaming) this.model = "***";

      if (this.config === null) this.config = img.inrichting;
      else if (this.config !== img.inrichting) this.config = "***";

      if (this.type === null) this.type = img.voertuigsoort;
      else if (this.type !== img.voertuigsoort) this.type = "***";
    });
  }
}
