import FormData from 'form-data';
import config from 'config';

export const sendEmail = async (
    to: string,
    templateName: string,
    subject: string,
    templateVars: Record<string, any> = {}
) => {
    const form = new FormData()
    form.append('to', to);
    form.append('template', templateName);
    form.append('subject', subject);
    form.append(
        'from',
        'mailgun@sandbox4ea7cfe84fde4fbcb3bf6b9157156213.mail.gun',
        'org'
    );

    Object.keys(templateVars).forEach((key) => {
        form.append(`v:${key}`, templateVars[key])
    }) 

    const username = 'api';
    const password = config.get('emailService.privateKey')
};