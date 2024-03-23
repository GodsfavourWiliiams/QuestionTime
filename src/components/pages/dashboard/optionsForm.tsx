import { useFieldArray } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

interface OptionFieldProps {
  control: any;
  name: string;
  errors: any;
  data?: any;
  isSuccess?: boolean;
}

export const OptionField: React.FC<OptionFieldProps> = ({
  control,
  name,
  errors,
  data,
  isSuccess,
}) => {
  const { fields, append, remove, replace } = useFieldArray({
    control,
    keyName: 'fieldId',
    name,
  });

  useEffect(() => {
    if (isSuccess) {
      replace(
        Array.isArray(data) && data.length > 0
          ? data.map((item: any) => ({
              option: item.option || '',
            }))
          : [
              {
                name: '',
                amount: '',
              },
            ]
      );
    }
    return () => {};
  }, [data, isSuccess, replace]);

  return (
    <>
      {fields.map((kpiField, index) => {
        return (
          <div key={kpiField.fieldId}>
            <FormField
              control={control}
              rules={{ required: true }}
              name={`${name}.${index}.option`}
              render={({ field }) => (
                <FormItem>
                  <FormControl className="w-full">
                    <div className="flex items-center w-full gap-2">
                      <Input
                        type="text"
                        error={Boolean(errors?.[name]?.[index]?.option)}
                        placeholder={`Enter option ${index + 1}`}
                        className="h-12"
                        endContent={
                          index > 2 ? (
                            <Button
                              type="button"
                              className="bg-transparent hover:bg-transparent p-0"
                              onClick={() => {
                                remove(index);
                              }}
                            >
                              <Icons.DeleteIcon className="w-3 h-3 text-destructive" />
                            </Button>
                          ) : (
                            <></>
                          )
                        }
                        {...field}
                      />
                      {index === fields.length - 1 && index <= 3 && (
                        <Button
                          type="button"
                          className="bg-zinc-50 hover:bg-zinc-100"
                          onClick={() => {
                            append({
                              option: '',
                            });
                          }}
                        >
                          <Icons.RoundAddIcon className="text-black" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        );
      })}
    </>
  );
};
