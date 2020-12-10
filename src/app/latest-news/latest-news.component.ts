import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
})
export class LatestNewsComponent implements OnInit {
  data: Array<Object>;
  constructor() { 
    this.data = [
      {
        title: "Apply for Orientation Board",
        date: "Nov. 30, 2020, 10:16 EST",
        author: "By Joshua Bulten",
        content: "Are you looking for a great summer paid internship that will challenge and grow you? Apply to be a part of the Orientation Board. If you are curious and have questions, we have an info meeting on December 1. Check out our website for more information: https://calvin.edu/offices-services/orientation/leadership-opportunities/orientation-interns/"
      },
      {
        title: "Virtual Movie Night with the Sustainability Coordinators!",
        date: "Nov. 30, 2020, 9:16 EST",
        author: "By Bethany Williams",
        content: 'Next Thursday, the SCs will be hosting a showing of the documentary Food, Inc. on MS Teams! Join us as we examine the ways in which our food system impacts the environment :) The Deets: - - Thursday, December 3 - - 6:30 - 8:00p.m. EST - - optional discussion afterwards How to watch: If you sign up via this form (https://urldefense.proofpoint.com/v2/url?u=https-3A__docs.google.com_forms_d_e_1FAIpQLSd9dTAsM55V5iGW-2DPOa2rEZWA-2D8W9RwxwTdS79nyZp1T90eQw_viewform-3Fusp-3Dsf-5Flink&d=DwIB-g&c=4rZ6NPIETe-LE5i2KBR4rw&r=kCPJsCp_HEjNpump8eHmu7pxhGVzoVk9lR8wY9P3VsE&m=H1kzsusWY2tX7sClbcDnWCM4LgxYZ9u9HWUBfn_fOho&s=ppfVhXcj0jvVZzqiIY5hhG0b-2RSKYJYFniimSWoBvs&e= ) we will send you an invite to the MS Teams meeting. You should be able to forward the email invite to anyone, so if your friends decide to come last-minute, they should be able to join, too!',
      }
    ]
  }

  ngOnInit(): void {
  }

}
