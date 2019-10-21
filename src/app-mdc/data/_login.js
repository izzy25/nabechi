export default function LoginForm(

    isDismiss = false,
    target

)
{

    let container = document.createElement('div'),
        form = document.createElement('form'),
        label = document.createElement('span'),
        input = document.createElement('input'),
        cinput = container.cloneNode(),
        userl = label.cloneNode(),
        passl = label.cloneNode(),
        useri = input.cloneNode(),
        passi = input.cloneNode(),
        submi = input.cloneNode(),
        Node = []
    ;

    if(isDismiss){
        container.className = 'container-login container-login--dismiss content';
    }else{
        container.className = 'container-login content';
    }

    form.className = 'form-login';
    cinput.className = 'form-login_row';

    let cuseri = cinput.cloneNode(), cpassi = cinput.cloneNode(), header = cinput.cloneNode();

    Node[0] = form;

    header.className += ' header-row';
    header.innerHTML = '<h1 class="mdc-typography--headline5">Login</h1>';

    userl.innerHTML = 'Username : ';
    passl.innerHTML = 'Password : ';

    useri.name = 'username';
    useri.type = 'text';
    useri.placeholder = 'Please type your username...';

    Node[1] = useri;

    passi.name = 'password';
    passi.type = 'password';
    passi.placeholder = 'Please type your password...';

    Node[2] = passi;

    submi.name = 'submit';
    submi.type = 'submit';

    Node[3] = submi;

    cuseri.append(userl);
    cuseri.append(useri);

    cpassi.append(passl);
    cpassi.append(passi);

    cinput.append(submi);

    form.append(header);
    form.append(cuseri);
    form.append(cpassi);
    form.append(cinput);

    container.append(form);

    document.getElementById(target).append(container);

    return Node;

}