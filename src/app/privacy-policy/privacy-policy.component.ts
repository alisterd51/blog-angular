import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent {
  companyName: string = 'anclarma';
  legalStatus: string = 'NC';
  registeredAddress: string = 'NC';
  contactEmailAddress: string = 'antoinereims28@gmail.com';
  nameResponsible: string = 'NC';
  responsibleEmailAddress: string = 'NC';
  lastUpdate: string = '29/05/2023 at 4:42';
}
