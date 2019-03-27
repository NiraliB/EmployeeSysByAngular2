
import { Injectable } from '@angular/core';
@Injectable()
export class EmpInitialization {

    public Qualification: any[] = [
        { qualiId: '1', Degree: 'Engineering' },
        { qualiId: '2', Degree: 'IT' },
        { qualiId: '3', Degree: 'Bsc' },
        { qualiId: '4', Degree: 'Msc' },
    ];

    public Experience: any[] = [
        { expId: '1', ExpName: 'Freshers' },
        { expId: '2', ExpName: '1 Years' },
        { expId: '3', ExpName: '2 Years' },
        { expId: '4', ExpName: '3 Years' }
    ];

    public Languages: any[] = [
        { lanId: '1', lanName: 'Gujarati' },
        { lanId: '2', lanName: 'Hindi' },
        { lanId: '3', lanName: 'English' },
        { lanId: '4', lanName: 'Marathi' }
    ];

}