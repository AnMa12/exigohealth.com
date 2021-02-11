import { Component, OnInit, Input } from '@angular/core';
import { faDiceD20, faRunning, faCommentMedical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features-page',
  templateUrl: './features-page.component.html',
  styleUrls: ['./features-page.component.scss']
})
export class FeaturesPageComponent implements OnInit {

    @Input() isOrthosis: boolean;

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
            icon: "E",
            content: `It covers all the recovery stages, because each stage of the rehabilitation needs another device, 
                      and these are expensive. Our orthosis locks the limb at a certain angle, it augments and it 
                      counterworks the patient's movements.`
        },
        {
            title: "Feedback and statistics",
            icon: "E",
            content: `It monitors the progress and provides feedback because the patients and the therapists have to be 
                      sure that the exercises are done correctly. The orthosis connects to the mobile app which provides 
                      statistics and feedback.`
        },
        {
            title: "3D printed",
            icon: "E",
            content: `Using only one photo, we extract through computer vision the patient limb's 
                      dimensions and we create the custom orthosis. That will create a user-friendly 
                      environment for the patients.`
        }
    ]

  constructor() { }

  ngOnInit(): void {
  }


}
