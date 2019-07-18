import autoInit from '@material/auto-init/index';
import * as textField from '@material/textfield';
import * as ripple from '@material/ripple';
import * as formField from '@material/form-field';
import * as checkbox from '@material/checkbox';

autoInit.register('MDCCheckbox', checkbox.MDCCheckbox);
autoInit.register('MDCFormField', formField.MDCFormField);
autoInit.register('MDCRipple', ripple.MDCRipple);
autoInit.register('MDCTextField', textField.MDCTextField);

autoInit();