import { Component, OnInit, Input} from '@angular/core';

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
          icon: "E",
          content: `It's hard to be long-term committed especially when it comes to physical effort. 
                    With our games, you will forget about the painful part of the exercises and engage in fun 
                    and concrete tasks that will help you complete the recovery session.`
      },
      {
          title: "Real time tracking",
          icon: "E",
          content: `Using only a camera and our A.I. powered motion tracking technology you 
                    receive real time feedback on the performed exercises so you can be sure that the 
                    rehabilitation process is done right and you can see your daily progress.`

      },
      {
          title: "Medical expertise",
          icon: "E",
          content: `The rehabilitation process involves the identification of a person's problems and needs. 
                    That's why with our platform you can message or schedule a video call to your physical 
                    therapist anytime a question raises.`
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
