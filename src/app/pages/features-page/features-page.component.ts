import { Component, OnInit, Input } from '@angular/core';
import { faDiceD20, faRunning, faCommentMedical, faRobot, faNotesMedical, faSwatchbook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.scss']
})
export class FeaturesPageComponent implements OnInit {

  @Input() productName: string;

  features_list = []  
  
  features_list_dpt = [
        {
            title: "Engaging sessions",
            icon: faDiceD20,
            content: `Forget about the painful part of the exercises and engage the tasks in fun and concrete ways to complete the recovery session with the interactive games.`
        },
        {
            title: "Real time tracking",
            icon: faRunning,
            content: `Receive real time feedback on your performance with the AI powered motion tracking technology, making sure that the rehabilitation process is done right.`

        },
        {
            title: "Medical expertise",
            icon: faCommentMedical,
            content: `Communicate directly with your physical therapist every time you need it by leaving a message or starting a video call directly from your account.`
        }
    ]

    features_list_orthosis = [
        {
            title: "Motor assisted",
            icon: faRobot,
            content: `It covers all the recovery stages: it locks the limb at a certain angle, it augments and it 
                      counterworks the patient's movements.`
        },
        {
            title: "Feedback and statistics",
            icon: faNotesMedical,
            content: `It connects to the mobile app which provides 
                      statistics and feedback.`
        },
        {
            title: "3D printed",
            icon: faSwatchbook,
            content: `Using only one photo, we extract through computer vision the patient limb's 
                      dimensions and we create the custom orthosis.`
        }
    ]

    

  constructor() { 

  }

  ngOnInit(): void {
    this.features_list = this.productName == "digitalPT" ? this.features_list_dpt : this.features_list_orthosis
  }


}
