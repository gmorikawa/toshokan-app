import { Component, inject } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../../../../services/topic.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TopicDTO } from '../../entities/topic.dto';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Topic } from '../../entities/topic.model';

@Component({
    selector: 'topic-register-page',
    imports: [
        NzButtonModule,
        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzIconModule,
        ReactiveFormsModule,
    ],
    templateUrl: './register.page.html',
    styleUrl: './register.page.css',
})
export class TopicRegisterPage {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly service = inject(TopicService);
    private readonly formBuilder = inject(NonNullableFormBuilder);

    private id = this.route.snapshot.paramMap.get('id');

    topicForm = new FormGroup({
        name: this.formBuilder.control("", Validators.required),
    });

    ngOnInit() {
        if (this.id && this.id !== "") {
            this.service.getById(this.id).subscribe((dto: TopicDTO) => {
                this.populateForm(new Topic(dto));
            });
        }
    }

    populateForm(topic: Topic): void {
        this.topicForm.patchValue({
            name: topic?.name,
        });
    }

    submitForm(): void {
        if (this.topicForm.valid) {
            const topicDto = this.topicForm.value as TopicDTO;

            if(this.id) {
                this.service.update(this.id, topicDto).subscribe((topic: TopicDTO) => {
                    this.router.navigateByUrl("/library/topic/listing");
                });
            } else {
                this.service.create(topicDto).subscribe((topic: TopicDTO) => {
                    this.router.navigateByUrl("/library/topic/listing");
                });
            }
        } else {
            Object.values(this.topicForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }

    handleCancel(): void {
        this.router.navigateByUrl("/library/topic/listing");
    }
}
