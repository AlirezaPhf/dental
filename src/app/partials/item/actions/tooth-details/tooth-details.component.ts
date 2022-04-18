import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { IBoneLoss, IIntro, IName, IReportInfo, IReportInfoCaries } from 'src/app/core/interfaces/server/IReport';
import { ApiService } from 'src/app/core/services/api.service';
import { MainService } from 'src/app/core/services/main.service';

@Component({
  selector: 'dental-tooth-details',
  templateUrl: './tooth-details.component.html',
  styleUrls: ['./tooth-details.component.scss']
})
export class ToothDetailsComponent implements OnInit {
  @Input() cariesTypes!: IName[];
  // ---
  @Input() cariesInfoTypes!: IName[];
  // ---
  @Input() retainedRootTypes!: IName[];
  // ---
  @Input() pulpLesionTypes!: IName[];
  // ---
  @Input() boneLossTypes!: IName[];
  // ---
  @Input() boneLossInfoTypes!: IName[];
  // ---
  @Input() calculusTypes!: IName[];
  // ---
  toothDetails!: IReportInfo;
  // ---
  cariesForm!: FormArray;
  // ---
  constructor(
    private mainService: MainService,
    private apiService: ApiService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.observeShowingTooth();
  }

  observeShowingTooth(): void {
    this.mainService.showToothDetails.subscribe(
      item => {
        this.toothDetails = item;
      }
    )
  }


  onCariesAction(type: IName, checkInfoCount: boolean = false): void {
    console.log('this.toothDetails: ', this.toothDetails);
    if (!this.toothDetails.caries) {
      this.toothDetails.caries = [];
      this.generateCaries(type.id);
    } else {
      const foundedCaries = this.toothDetails.caries.find(x => x.type === type.id);
      // ---
      if (foundedCaries) {
        // remove item
        if (!checkInfoCount) {
          this.toothDetails.caries = this.toothDetails.caries.filter(x => x.type !== type.id);
        }
      } else {
        this.generateCaries(type.id);
      }
    }

  }

  generateCaries(typeId?: number): void {
    let item: IReportInfoCaries = {
      type: typeId ? typeId : 0,
      description: '',
      cariesInfos: []
    };
    this.toothDetails.caries.push(item);
  }


  onCariesInfoAction(infoType: IName, parentType: IName) {
    this.onCariesAction(parentType, true);
    // ---
    const founded = this.toothDetails.caries.find(x => x.type === parentType.id);
    if (founded) {
      const foundedInfo = founded.cariesInfos.find(x => x.type === infoType.id);
      if (foundedInfo) {
        founded.cariesInfos = founded.cariesInfos.filter(x => x.type !== infoType.id);
        if (founded.cariesInfos.length === 0) {
          this.toothDetails.caries = this.toothDetails.caries.filter(x => x.type !== parentType.id);
        }

      } else {
        founded.cariesInfos.push({
          type: infoType.id,
          description: ''
        });
      }




    }
    console.log('data', this.mainService.getAppData());

  }


  onRetainedRootAction(type: IName) {
    if (!this.toothDetails.retainedRoot) {
      this.generateRetainedRoot(type.id);
    } else {
      this.toothDetails.retainedRoot.type = this.toothDetails.retainedRoot.type === type.id ? (-1) : type.id;
    }

  }

  generateRetainedRoot(typeId?: number): void {
    let item: IIntro = {
      type: typeId ? typeId : 0,
      description: '',
    };
    this.toothDetails.retainedRoot = item;
  }


  onPulpLesionAction(type: IName): void {
    if (!this.toothDetails.pulpLesion) {
      this.generatePulpLesion(type.id);
    } else {
      this.toothDetails.pulpLesion.type = this.toothDetails.pulpLesion.type === type.id ? (-1) : type.id;
    }

  }

  generatePulpLesion(typeId?: number): void {
    let item: IIntro = {
      type: typeId ? typeId : 0,
      description: '',
    };
    this.toothDetails.pulpLesion = item;
  }


  isActiveCaries(typeId: number): boolean {
    let item = false;
    // ---
    if (this.toothDetails.caries) {
      item = this.toothDetails.caries.find(x => x.type === typeId) ? true : false;
    }
    return item;
  }


  isActiveCariesInfo(infoTypeId: number, parentTypeId: number): boolean {
    let item = false;
    // ---
    if (this.toothDetails.caries) {
      const foundedParent = this.toothDetails.caries.find(x => x.type === parentTypeId);
      if (foundedParent) {
        item = foundedParent.cariesInfos.find(x => x.type === infoTypeId) ? true : false;
      }

    }
    return item;
  }


  onBoneLossAction(type: IName): void {
    if (!this.toothDetails.boneLoss) {
      let boneLoss: IBoneLoss[] = [
        {
          type: type.id,
          boneLossInfo: []
        }
      ];
      this.toothDetails.boneLoss = boneLoss;
    } else {
      this.toothDetails.boneLoss[0].type = this.toothDetails.boneLoss[0].type === type.id ? -1 : type.id;
      if (this.toothDetails.boneLoss[0].type === type.id) {
        this.toothDetails.boneLoss[0].boneLossInfo = [];
      }
    }
    // ---

  }

  changeBoneLose(value: boolean, index: number): void {
    if (value) {
      this.toothDetails.boneLoss[0].boneLossInfo.push(
        {
          type: +('8000' + index.toString())
        }
      )
    } else {
      this.toothDetails.boneLoss[0].boneLossInfo = this.toothDetails.boneLoss[0].boneLossInfo.filter(x => x.type !== +('8000' + index.toString()));
    }
    console.log('this.toothDetails.boneLoss: ', this.toothDetails.boneLoss);

  }

  isCheckedBoneLoseInfo(index: number): boolean {
    let status = false;
    // ---
    if (this.toothDetails.boneLoss) {
      status = this.toothDetails.boneLoss[0].boneLossInfo.find(x => x.type === +('8000' + index.toString())) ? true : false;
    }
    return status;
  }

  isCheckedCalculus(index: number): boolean {
    let status = false;
    // ---
    if (this.toothDetails.calculus) {
      status = this.toothDetails.calculus.find(x => x.type === +('9000' + index.toString())) ? true : false;
    }
    return status;
  }

  changeCalculus(value: boolean, index: number): void {
    if (!this.toothDetails.calculus) {
      this.toothDetails.calculus = []
    }
    if (value) {
      this.toothDetails.calculus.push(
        { type: +('9000' + index.toString()) }
      )
    } else {
      this.toothDetails.calculus = this.toothDetails.calculus.filter(x => x.type !== +('9000' + index.toString()));
    }

  }

  onImpactedAction() {
    if (this.toothDetails.impactedTeeth) {
      this.toothDetails.impactedTeeth.type = this.toothDetails.impactedTeeth.type === 110001 ? -1 : 110001;
    } else {
      this.toothDetails.impactedTeeth = {
        type: 110001
      }
    }
  }




  saveChanges(): void {
    const appData = this.mainService.getAppData();
    console.log('appData: ', appData);
    this.apiService.saveReport(appData).subscribe(
      x => {
        this.toaster.success('عملیات موردنظر با موفقیت انجام شد');
      }
    )

  }




  // if (this.lastItem) {
  //   const appData = this.mainService.getAppData();
  //   const foundedPosition = appData[this.lastItem.forChildren ? 'children' : 'adult'][this.lastItem.positionType === 20001 || this.lastItem.positionType === 20002 ? 'top' : 'bottom'];
  //   const foundedItem = foundedPosition.find(x => x.toothType === item.toothType);
  // }


}
